#!/usr/bin/env node
/**
 * Daily ECNL / ECRL standings fetcher (TotalGlobalSports public API).
 *
 * Runs in GitHub Actions (Node 20+, global fetch). For each ENABLED conference
 * in scripts/standings-config.mjs it pulls the TGS JSON, groups the rows by age
 * division, and writes data/standings.json for the site to render.
 *
 * Robustness: the exact TGS JSON schema couldn't be verified from the build
 * environment, so this does NOT assume field names. It (1) walks the response
 * and groups any "row-like" objects by their nearest division/age label, and
 * (2) fuzzy-maps each stat (W/L/D/Pts/GP/GF/GA/GD/rank/team) by matching
 * key-name patterns. If a conference returns nothing it's skipped; if all fail
 * the existing standings.json is left untouched (site falls back to source
 * links). Self-test (offline): `node fetch-standings.mjs --selftest`.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, '..', 'data', 'standings.json');

const BROWSER_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const TGS_HEADERS = {
  'User-Agent': BROWSER_UA,
  Accept: 'application/json, text/plain, */*',
  Origin: 'https://www.theecnl.com',
  Referer: 'https://www.theecnl.com/',
};

const PATTERNS = {
  team: [/team_?name/i, /^team$/i, /^name$/i, /club_?name/i, /^club$/i],
  rank: [/^rank$/i, /position/i, /^place$/i],
  gp: [/games?_?played/i, /^gp$/i, /^played$/i, /matche?s_?played/i, /total_?games?/i],
  w: [/total_?wins?/i, /matche?s_?won/i, /^wins?$/i, /^won$/i, /^w$/i],
  l: [/total_?los(s|es|t)/i, /matche?s_?lost/i, /^loss(es)?$/i, /^lost$/i, /^l$/i],
  d: [/total_?ties?/i, /total_?draws?/i, /matche?s_?(tied|drawn)/i, /^ties?$/i, /^draws?$/i, /^tied$/i, /^[dt]$/i],
  pts: [/total_?points?/i, /^points?$/i, /^pts$/i, /^p$/i],
  gf: [/goals?_?for/i, /goals?_?scored/i, /^gf$/i, /^scored$/i],
  ga: [/goals?_?against/i, /goals?_?allowed/i, /^ga$/i, /^allowed$/i],
  gd: [/goal_?diff(erential|erence)?/i, /^gd$/i, /^differential$/i, /goal_?dif/i],
};

// Name-ish keys for a division/age container (NOT a team row).
const GROUP_NAME = [
  /division_?name/i,
  /age_?group/i,
  /^age$/i,
  /group_?name/i,
  /bracket_?name/i,
  /flight_?name/i,
  /^name$/i,
  /^title$/i,
];

function pick(obj, patterns) {
  for (const p of patterns) {
    for (const k of Object.keys(obj)) {
      if (p.test(k)) return obj[k];
    }
  }
  return undefined;
}

function pickName(obj) {
  for (const p of GROUP_NAME) {
    for (const k of Object.keys(obj)) {
      if (p.test(k) && typeof obj[k] === 'string' && obj[k].trim()) return obj[k].trim();
    }
  }
  return '';
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

function sortRows(rows) {
  const hasRanks = rows.some((r) => r.rank > 0);
  rows.sort((a, b) => (hasRanks ? a.rank - b.rank : b.pts - a.pts || b.gd - a.gd));
  return rows.map((r, i) => ({ ...r, rank: r.rank || i + 1 }));
}

// Walk the JSON and collect { group, rows } — one entry per age/division array
// of team rows, labeled with that container's name.
function findGroups(node, out = []) {
  if (Array.isArray(node)) {
    const rows = node.filter(looksLikeRow).map(normalizeRow).filter((r) => r.team);
    if (rows.length) out.push({ group: '', rows });
    for (const item of node) {
      if (item && typeof item === 'object' && !looksLikeRow(item)) findGroups(item, out);
    }
    return out;
  }
  if (node && typeof node === 'object') {
    const name = pickName(node);
    for (const v of Object.values(node)) {
      if (Array.isArray(v)) {
        const rows = v.filter(looksLikeRow).map(normalizeRow).filter((r) => r.team);
        if (rows.length) out.push({ group: name || '', rows });
        for (const item of v) {
          if (item && typeof item === 'object' && !looksLikeRow(item)) findGroups(item, out);
        }
      } else if (v && typeof v === 'object') {
        findGroups(v, out);
      }
    }
  }
  return out;
}

export function parseConferenceGroups(json) {
  const groups = findGroups(json)
    .filter((g) => g.rows.length)
    .map((g) => ({ group: g.group, rows: sortRows(g.rows) }));
  // Sort age groups in a sensible order (by any number in the label).
  groups.sort((a, b) => {
    const na = parseInt((a.group.match(/\d+/) || ['999'])[0], 10);
    const nb = parseInt((b.group.match(/\d+/) || ['999'])[0], 10);
    return na - nb || a.group.localeCompare(b.group);
  });
  return groups;
}

// Flat list of every row-like object (used only for diagnostic key logging).
function collectSample(node, out = []) {
  if (Array.isArray(node)) node.forEach((n) => collectSample(n, out));
  else if (node && typeof node === 'object') {
    if (looksLikeRow(node)) out.push(node);
    else Object.values(node).forEach((v) => collectSample(v, out));
  }
  return out;
}

async function fetchConference(target, tgsUrl) {
  const url = tgsUrl(target.eventId, target.conferenceId);
  try {
    const res = await fetch(url, { headers: TGS_HEADERS, signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const groups = parseConferenceGroups(json);
    const teamCount = groups.reduce((n, g) => n + g.rows.length, 0);
    if (teamCount === 0) {
      const sample = collectSample(json)[0];
      console.warn(
        `  ! ${target.name}: 0 rows (event ${target.eventId}/conf ${target.conferenceId})` +
          (sample ? ` — sample keys: ${Object.keys(sample).join(', ')}` : ''),
      );
      return null;
    }
    console.log(`  ✓ ${target.name}: ${teamCount} teams across ${groups.length} age group(s)`);
    return { id: target.id, league: target.league, name: target.name, source: url, groups };
  } catch (err) {
    console.warn(`  ✗ ${target.name}: ${err.message}`);
    return null;
  }
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

  const existing = await readFile(OUT_PATH, 'utf8').then(JSON.parse).catch(() => ({}));
  const payload = {
    lastUpdated: new Date().toISOString(),
    note: existing.note,
    conferences: results,
  };
  await writeFile(OUT_PATH, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${results.length} conference table(s).`);
}

function selftest() {
  const nested = {
    data: [
      {
        divisionName: 'U15',
        standings: [
          { rank: 2, teamName: 'Beta SC', gamesPlayed: 10, wins: 6, losses: 2, ties: 2, points: 20, goalsFor: 22, goalsAgainst: 12 },
          { rank: 1, teamName: 'Alpha FC', gamesPlayed: 10, wins: 8, losses: 1, ties: 1, points: 25, goalsFor: 30, goalsAgainst: 8 },
        ],
      },
      {
        divisionName: 'U17',
        standings: [
          { team_name: 'Gamma United', total_wins: 7, total_loses: 2, total_ties: 1, goals_for: 25, goals_against: 10 },
        ],
      },
    ],
  };

  const groups = parseConferenceGroups(nested);
  const u15 = groups.find((g) => g.group === 'U15');
  const u17 = groups.find((g) => g.group === 'U17');
  const checks = [
    [groups.length === 2, `group count: ${groups.length}`],
    [groups[0].group === 'U15', `age order first: ${groups[0]?.group}`],
    [u15 && u15.rows[0].team === 'Alpha FC' && u15.rows[0].rank === 1, `U15 sorted by rank: ${u15?.rows[0]?.team}`],
    [u15 && u15.rows[0].w === 8 && u15.rows[0].pts === 25, `fuzzy map: ${JSON.stringify(u15?.rows[0])}`],
    [u15 && u15.rows[0].gd === 22, `gd computed: ${u15?.rows[0]?.gd}`],
    [u17 && u17.rows[0].team === 'Gamma United' && u17.rows[0].pts === 22, `snake_case map + pts: ${JSON.stringify(u17?.rows[0])}`],
    [u17 && u17.rows[0].gp === 10, `gp computed (7+2+1): ${u17?.rows[0]?.gp}`],
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
