#!/usr/bin/env node
/**
 * Daily NorCal futsal news refresher.
 *
 * Pulls Google News RSS search feeds for NorCal futsal topics, keeps the most
 * recent items, and writes data/futsal-news.json for the Futsal section to show
 * a "Latest futsal news" strip. Dependency-free; defensive (any feed that fails
 * is skipped, and if nothing is reachable the existing file is left untouched).
 *
 * Self-test (offline): `node fetch-futsal-news.mjs --selftest`
 * Purge bad items:     `node fetch-futsal-news.mjs --purge`
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, '..', 'data', 'futsal-news.json');

const MAX_ITEMS = 8;
const BROWSER_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const gnews = (q) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-US&gl=US&ceid=US:en`;

const FEEDS = [
  gnews('NorCal futsal youth'),
  gnews('futsal "Northern California" league'),
  gnews('"US Youth Futsal" championship California'),
  gnews('California futsal "state cup" youth'),
];

// Every item must actually be about futsal (not regular outdoor soccer or beach
// soccer that slips in from "state cup" / "California soccer" queries).
const FUTSAL_RE = /\b(futsal|indoor soccer|five-a-side|5-a-side)\b/i;

// Drop items that are clearly NOT futsal despite matching the query.
const NOT_FUTSAL = /\b(beach soccer|sand soccer|arena football|water polo)\b/i;

function passesQuality(text) {
  if (!FUTSAL_RE.test(text)) return false;
  if (NOT_FUTSAL.test(text)) return false;
  return true;
}

function clean(s = '') {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    // decode < > BEFORE stripping tags so entity-encoded HTML gets stripped too
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;|&#x27;/g, "'")
    .replace(/&#0?38;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function field(block, name) {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? clean(m[1]) : '';
}

function linkOf(block) {
  const text = field(block, 'link');
  if (text && /^https?:/i.test(text)) return text;
  const href = block.match(/<link[^>]*href="([^"]+)"/i);
  return href ? href[1] : '';
}

export function parseFeed(xml) {
  const blocks = xml.match(/<(item|entry)[\s\S]*?<\/\1>/gi) || [];
  const out = [];
  for (const b of blocks) {
    let title = field(b, 'title');
    const url = linkOf(b);
    if (!title || !url) continue;
    const itemSource = field(b, 'source');
    if (itemSource && title.endsWith(`- ${itemSource}`)) {
      title = title.slice(0, -(itemSource.length + 2)).trim();
    }
    const rawDate = field(b, 'pubDate') || field(b, 'published') || field(b, 'updated') || '';
    const date =
      rawDate && !Number.isNaN(Date.parse(rawDate))
        ? new Date(rawDate).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10);
    const summaryRaw =
      field(b, 'description') || field(b, 'summary') || field(b, 'content') || '';
    const combined = `${title} ${summaryRaw}`;
    if (!passesQuality(combined)) continue;
    out.push({
      id: `futsal-${Buffer.from(title).toString('base64url').slice(0, 28)}`,
      title,
      url,
      source: itemSource || 'Google News',
      date,
    });
  }
  return out;
}

function normTitle(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function dedupe(items) {
  const seen = new Set();
  const out = [];
  for (const it of items) {
    const key = normTitle(it.title);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(it);
  }
  return out;
}

async function fetchFeed(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': BROWSER_UA, Accept: 'application/rss+xml, application/xml, */*' },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const items = parseFeed(await res.text());
    console.log(`  ✓ ${items.length} items`);
    return items;
  } catch (err) {
    console.warn(`  ✗ ${err.message}`);
    return [];
  }
}

async function main() {
  console.log('Refreshing NorCal futsal news…');
  const existing = await readFile(OUT_PATH, 'utf8').then(JSON.parse).catch(() => ({ items: [] }));

  // Re-run quality gate on seeded items so anything that slipped in before
  // this filter existed gets dropped on this run.
  const seed = (existing.items || []).filter((it) =>
    passesQuality(`${it.title ?? ''} ${it.summary ?? ''}`),
  );

  const fetched = (await Promise.all(FEEDS.map(fetchFeed))).flat();
  if (fetched.length === 0) {
    console.log('No feeds reachable — leaving futsal-news.json unchanged.');
    return;
  }

  const items = dedupe([...fetched, ...seed])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_ITEMS);

  await writeFile(
    OUT_PATH,
    JSON.stringify({ lastUpdated: new Date().toISOString(), items }, null, 2) + '\n',
    'utf8',
  );
  console.log(`Wrote ${items.length} futsal news items.`);
}

function selftest() {
  // Legitimate futsal item — must pass
  const futsalSample = `<rss><channel>
    <item>
      <title>NorCal club wins US Youth Futsal title - SoccerWire</title>
      <link>https://news.google.com/rss/articles/ABC</link>
      <pubDate>Fri, 29 May 2026 12:00:00 GMT</pubDate>
      <description>NorCal youth futsal club takes home the championship</description>
      <source url="https://soccerwire.com">SoccerWire</source>
    </item>
  </channel></rss>`;

  // Regular outdoor soccer from the "state cup" query — no "futsal" → dropped
  const soccerSample = `<rss><channel>
    <item>
      <title>Cal North State Cup Series concludes with Fourteen Champions - Cal North</title>
      <link>https://news.google.com/rss/articles/CN1</link>
      <pubDate>Thu, 06 May 2026 09:00:00 GMT</pubDate>
      <description>Cal North State Cup outdoor soccer championships</description>
      <source url="https://calnorth.org">Cal North</source>
    </item>
  </channel></rss>`;

  // Beach soccer — has "futsal" adjacent keywords but NOT_FUTSAL match → dropped
  const beachSample = `<rss><channel>
    <item>
      <title>Southern California beach soccer championship draws huge crowds - CBS8</title>
      <link>https://news.google.com/rss/articles/BS1</link>
      <pubDate>Fri, 30 May 2026 09:00:00 GMT</pubDate>
      <description>Beach soccer championship in Southern California</description>
      <source url="https://cbs8.com">CBS8</source>
    </item>
  </channel></rss>`;

  // International / non-NorCal futsal league — passes FUTSAL_RE
  const intlSample = `<rss><channel>
    <item>
      <title>Extra Futsal League returns with nationwide fixtures - FBC News</title>
      <link>https://news.google.com/rss/articles/EFL1</link>
      <pubDate>Tue, 20 May 2026 09:00:00 GMT</pubDate>
      <description>The Extra Futsal League returns across the country</description>
      <source url="https://fbcnews.com">FBC News</source>
    </item>
  </channel></rss>`;

  const a = parseFeed(futsalSample)[0];
  const soccer = parseFeed(soccerSample);
  const beach = parseFeed(beachSample);
  const intl = parseFeed(intlSample);

  const checks = [
    [soccer.length === 0, `outdoor soccer dropped — not futsal (got ${soccer.length})`],
    [beach.length === 0, `beach soccer dropped — NOT_FUTSAL (got ${beach.length})`],
    [intl.length === 1, `intl futsal league kept — has "futsal" (got ${intl.length})`],
    [a?.title === 'NorCal club wins US Youth Futsal title', `title de-suffix: "${a?.title}"`],
    [a?.source === 'SoccerWire', `source: "${a?.source}"`],
    [a?.date === '2026-05-29', `date: "${a?.date}"`],
    [a?.url === 'https://news.google.com/rss/articles/ABC', `link: "${a?.url}"`],
  ];
  let ok = true;
  for (const [pass, msg] of checks) {
    console.log(`  ${pass ? '✓' : '✗ FAIL'} ${msg}`);
    if (!pass) ok = false;
  }
  if (!ok) process.exit(1);
  console.log('selftest passed ✓');
}

if (process.argv.includes('--selftest')) {
  selftest();
} else if (process.argv.includes('--purge')) {
  (async () => {
    const existing = JSON.parse(await readFile(OUT_PATH, 'utf8'));
    const items = Array.isArray(existing.items) ? existing.items : [];
    const kept = items.filter((it) =>
      passesQuality(`${it.title ?? ''} ${it.summary ?? ''}`),
    );
    for (const it of items) {
      if (!kept.includes(it)) console.log(`  ✗ dropped: ${it.title}`);
    }
    await writeFile(
      OUT_PATH,
      JSON.stringify({ ...existing, items: kept }, null, 2) + '\n',
      'utf8',
    );
    console.log(`Purged ${items.length - kept.length} item(s); ${kept.length} remain.`);
  })().catch((err) => {
    console.error('purge failed:', err);
    process.exit(1);
  });
} else {
  main().catch((err) => {
    console.error('futsal news refresh failed:', err);
    process.exit(0);
  });
}
