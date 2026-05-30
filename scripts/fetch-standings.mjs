#!/usr/bin/env node
/**
 * Daily ECNL / ECRL standings fetcher (TotalGlobalSports public API).
 *
 * Runs in GitHub Actions (Node 20+, global fetch). For each ENABLED conference
 * in data/standings-config.ts it pulls the TGS JSON, extracts the standings
 * rows and writes data/standings.json for the site to render.
 *
 * Robustness: the exact TGS JSON schema could not be verified from the build
 * environment, so this does NOT assume field names. Instead it (1) deep-scans
 * the response for objects that "look like" a standings row and (2) fuzzy-maps
 * each stat (W/L/D/Pts/GP/GF/GA/GD/rank/team) by matching key-name patterns.
 * If a conference returns nothing it is skipped; if everything fails the
 * existing standings.json is left untouched and the site falls back to the
 * official source links. Self-test: `node fetch-standings.mjs --selftest`.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, '..', 'data', 'standings.json');

const BROWSER_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const PATTERNS = {
  team: [/team_?name/i, /^team$/i, /^name$/i, /club_?name/i, /^club$/i],
  rank: [/^rank$/i, /position/i, /^place$/i, /standing(s)?_?(rank|position)?/i],
  gp: [/games?_?played/i, /^gp$/i, /^played$/i, /matche?s_?played/i, /total_?games?/i],
  w: [/total_?wins?/i, /matche?s_?won/i, /^wins?$/i, /^won$/i, /^w$/i],
  l: [/total_?los(s|es|t)/i, /matche?s_?lost/i, /^loss(es)?$/i, /^lost$/i, /^l$/i],
  d: [/total_?ties?/i, /total_?draws?/i, /matche?s_?(tied|drawn)/i, /^ties?$/i, /^draws?$/i, /^tied$/i, /^[dt]$/i],
  pts: [/total_?points?/i, /^points?$/i, /^pts$/i, /^p$/i],
  gf: [/goals?_?for/i, /goals?_?scored/i, /^gf$/i, /^scored$/i],
  ga: [/goals?_?against/i, /goals?_?allowed/i, /^ga$/i, /^allowed$/i],
  gd: [/goal_?diff(erential|erence)?/i, /^gd$/i, /^differential$/i, /goal_?dif/i],
};

function pick(obj, patterns) {
  for (const p of patterns) {
    for (const k of Object.keys(obj)) {
      if (p.test(k)) return obj[k];
    }
  }
  return undefined;
}

function num(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function looksLikeRow(o) {
  if (!o || typeof o !== 'object' || Array.isArray(o)) return false;
  const hasTeam = pick(o, PATTERNS.team) !== undefined;
  const hasStat =
    pick(o, PATTERNS.pts) !== undefined ||
    pick(o, PATTERNS.w) !== undefined ||
    pick(o, PATTERNS.gp) !== undefined;
  return hasTeam && hasStat;
}

// Deep-scan any JSON shape for standings rows.
function collectRows(node, out = []) {
  if (Array.isArray(node)) {
    for (const item of node) collectRows(item, out);
  } else if (node && typeof node === 'object') {
    if (looksLikeRow(node)) {
      out.push(node);
      return out; // don't descend into a row
    }
    for (const v of Object.values(node)) collectRows(v, out);
  }
  return out;
}

function normalizeRow(o) {
  const team = String(pick(o, PATTERNS.team) ?? '').trim();
  const w = num(pick(o, PATTERNS.w));
  const l = num(pick(o, PATTERNS.l));
  const d = num(pick(o, PATTERNS.d));
  let pts = pick(o, PATTERNS.pts);
  pts = pts === undefined ? w * 3 + d : num(pts);
  const gf = num(pick(o, PATTERNS.gf));
  const ga = num(pick(o, PATTERNS.ga));
  let gd = pick(o, PATTERNS.gd);
  gd = gd === undefined ? gf - ga : num(gd);
  const gpRaw = pick(o, PATTERNS.gp);
  const gp = gpRaw === undefined ? w + l + d : num(gpRaw);
  const rank = num(pick(o, PATTERNS.rank));
  return { rank, team, gp, w, l, d, pts, gf, ga, gd };
}

export function parseStandings(json) {
  const rows = collectRows(json)
    .map(normalizeRow)
    .filter((r) => r.team);
  // Sort by provided rank if present, else by points then goal difference.
  const hasRanks = rows.some((r) => r.rank > 0);
  rows.sort((a, b) =>
    hasRanks ? a.rank - b.rank : b.pts - a.pts || b.gd - a.gd,
  );
  return rows.map((r, i) => ({ ...r, rank: r.rank || i + 1 }));
}

const TGS_HEADERS = {
  'User-Agent': BROWSER_UA,
  Accept: 'application/json, text/plain, */*',
  Origin: 'https://www.theecnl.com',
  Referer: 'https://www.theecnl.com/',
};

async function fetchConference(target, tgsUrl) {
  // For region-specific events, every table is already the right region, so we
  // can safely try a few candidate conferenceIds. For league-wide events we
  // only use the exact configured id (a wrong id would pull another region).
  const candidates = target.regionSpecific
    ? [...new Set([target.conferenceId, 13, 12, 11, 14, 9, 15].filter((n) => Number.isInteger(n) && n > 0))]
    : [target.conferenceId].filter((n) => Number.isInteger(n) && n > 0);

  if (candidates.length === 0) {
    console.warn(`  ✗ ${target.name}: no conferenceId set`);
    return null;
  }

  let lastErr = '';
  for (const confId of candidates) {
    const url = tgsUrl(target.eventId, confId);
    try {
      const res = await fetch(url, { headers: TGS_HEADERS, signal: AbortSignal.timeout(20000) });
      if (!res.ok) {
        lastErr = `HTTP ${res.status}`;
        continue;
      }
      const json = await res.json();
      const rows = parseStandings(json);
      if (rows.length === 0) {
        const sample = collectRows(json)[0];
        if (sample) {
          console.warn(`    ${target.name} conf ${confId}: 0 rows; sample keys: ${Object.keys(sample).join(', ')}`);
        }
        continue;
      }
      console.log(`  ✓ ${target.name}: ${rows.length} teams (event ${target.eventId}, conf ${confId})`);
      return { id: target.id, league: target.league, name: target.name, source: url, rows };
    } catch (err) {
      lastErr = err.message;
    }
  }
  console.warn(`  ✗ ${target.name}: no rows (event ${target.eventId}; tried conf ${candidates.join(',')}; last: ${lastErr})`);
  return null;
}

async function main() {
  const { conferenceTargets, tgsStandingsUrl } = await import('./standings-config.mjs');

  const targets = conferenceTargets.filter((t) => t.enabled);
  console.log(`Fetching ${targets.length} enabled conference(s)…`);

  const results = [];
  for (const t of targets) {
    const r = await fetchConference(t, tgsStandingsUrl);
    if (r) results.push(r);
  }

  if (results.length === 0) {
    console.log('No standings fetched — leaving standings.json unchanged.');
    return;
  }

  const existing = await readFile(OUT_PATH, 'utf8')
    .then(JSON.parse)
    .catch(() => ({}));

  const payload = {
    lastUpdated: new Date().toISOString(),
    note: existing.note,
    conferences: results,
  };
  await writeFile(OUT_PATH, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${results.length} conference table(s).`);
}

function selftest() {
  // Two deliberately different schemas to prove fuzzy mapping + deep scan.
  const flat = [
    { rank: 1, teamName: 'Alpha FC', gamesPlayed: 10, wins: 8, losses: 1, ties: 1, points: 25, goalsFor: 30, goalsAgainst: 8 },
    { rank: 2, teamName: 'Beta SC', gamesPlayed: 10, wins: 6, losses: 2, ties: 2, points: 20, goalsFor: 22, goalsAgainst: 12 },
  ];
  const nested = {
    data: {
      conference: 'NorCal',
      standings: [
        { team_name: 'Gamma United', total_wins: 7, total_loses: 2, total_ties: 1, total_points: 22, goals_for: 25, goals_against: 10 },
        { team_name: 'Delta Club', total_wins: 5, total_loses: 4, total_ties: 1, goals_for: 18, goals_against: 17 },
      ],
    },
  };

  const a = parseStandings(flat);
  const b = parseStandings(nested);
  const checks = [
    [a.length === 2, `flat row count: ${a.length}`],
    [a[0].team === 'Alpha FC' && a[0].w === 8 && a[0].pts === 25, `flat map: ${JSON.stringify(a[0])}`],
    [a[0].gd === 22, `flat gd computed: ${a[0].gd}`],
    [b.length === 2, `nested row count: ${b.length}`],
    [b[0].team === 'Gamma United' && b[0].pts === 22, `nested map: ${JSON.stringify(b[0])}`],
    [b[1].pts === 16, `nested pts computed (5*3+1): ${b[1].pts}`],
    [b[0].gp === 10, `nested gp computed (7+2+1): ${b[0].gp}`],
  ];
  let ok = true;
  for (const [pass, msg] of checks) {
    console.log(`  ${pass ? '✓' : '✗ FAIL'} ${msg}`);
    if (!pass) ok = false;
  }
  if (!ok) {
    console.error('selftest FAILED');
    process.exit(1);
  }
  console.log('selftest passed ✓');
}

if (process.argv.includes('--selftest')) {
  selftest();
} else {
  main().catch((err) => {
    console.error('standings refresh failed:', err);
    process.exit(0); // never fail the pipeline over standings
  });
}
