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
  gnews('futsal Northern California league'),
  gnews('US Youth Futsal championship'),
  gnews('California futsal state cup youth'),
];

function clean(s = '') {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
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

  const fetched = (await Promise.all(FEEDS.map(fetchFeed))).flat();
  if (fetched.length === 0) {
    console.log('No feeds reachable — leaving futsal-news.json unchanged.');
    return;
  }

  const items = dedupe([...fetched, ...(existing.items || [])])
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
  const sample = `<rss><channel>
    <item>
      <title>NorCal club wins US Youth Futsal title - SoccerWire</title>
      <link>https://news.google.com/rss/articles/ABC</link>
      <pubDate>Fri, 29 May 2026 12:00:00 GMT</pubDate>
      <source url="https://soccerwire.com">SoccerWire</source>
    </item>
  </channel></rss>`;
  const a = parseFeed(sample)[0];
  const checks = [
    [a.title === 'NorCal club wins US Youth Futsal title', `title de-suffix: ${a?.title}`],
    [a.source === 'SoccerWire', `source: ${a?.source}`],
    [a.date === '2026-05-29', `date: ${a?.date}`],
    [a.url === 'https://news.google.com/rss/articles/ABC', `link: ${a?.url}`],
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
} else {
  main().catch((err) => {
    console.error('futsal news refresh failed:', err);
    process.exit(0);
  });
}
