#!/usr/bin/env node
/**
 * Daily youth-soccer news refresher.
 *
 * Runs in GitHub Actions (Node 20+, global fetch). Pulls news primarily from
 * Google News RSS *search* feeds (which are built for programmatic access and
 * don't block bots the way some club/site feeds do), keeps the mix ~90% youth /
 * ~10% pro, merges with the existing seed items, de-dupes, and writes
 * data/news.json. Dependency-free on purpose.
 *
 * It is defensive: any feed that fails is skipped, and if NOTHING can be
 * fetched the existing news.json is left untouched (the site never goes blank).
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const NEWS_PATH = join(__dirname, '..', 'data', 'news.json');

const MAX_ITEMS = 24;
const MAX_PRO = 3; // keep pro coverage to ~10%

const BROWSER_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

// Build a Google News RSS search URL for a query.
const gnews = (q) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-US&gl=US&ceid=US:en`;

// ~90% youth: lots of youth queries, a couple of pro ones (capped by MAX_PRO).
const FEEDS = [
  { url: gnews('ECNL youth soccer'), source: 'Google News', category: 'youth' },
  { url: gnews('MLS NEXT youth soccer'), source: 'Google News', category: 'youth' },
  { url: gnews('Girls Academy youth soccer league'), source: 'Google News', category: 'youth' },
  { url: gnews('NorCal Premier youth soccer'), source: 'Google News', category: 'youth' },
  { url: gnews('youth soccer college commitment'), source: 'Google News', category: 'youth' },
  { url: gnews('"ECNL Girls" OR "ECNL Boys"'), source: 'Google News', category: 'youth' },
  { url: gnews('US youth soccer development academy'), source: 'Google News', category: 'youth' },
  // A little pro coverage:
  { url: gnews('NWSL'), source: 'Google News', category: 'pro' },
  { url: gnews('MLS homegrown academy'), source: 'Google News', category: 'pro' },
  // Direct site feeds as a bonus (skipped automatically if they block bots):
  { url: 'https://www.soccerwire.com/feed/', source: 'SoccerWire', category: 'youth' },
];

const YOUTH_HINTS =
  /\b(youth|academy|ecnl|ecrl|mls next|npl|u1[3-9]|u-1[3-9]|college|commit|recruit|high school|girls academy|ga aspire|usl academy|homegrown|club soccer)\b/i;

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
  // RSS <link>text</link> or Atom <link href="..."/>
  const text = field(block, 'link');
  if (text && /^https?:/i.test(text)) return text;
  const href = block.match(/<link[^>]*href="([^"]+)"/i);
  return href ? href[1] : '';
}

function parseFeed(xml, feed) {
  const blocks = xml.match(/<(item|entry)[\s\S]*?<\/\1>/gi) || [];
  const out = [];
  for (const b of blocks) {
    let title = field(b, 'title');
    const url = linkOf(b);
    if (!title || !url) continue;

    // Google News items carry the publisher in <source> and append it to title.
    const itemSource = field(b, 'source');
    if (itemSource && title.endsWith(`- ${itemSource}`)) {
      title = title.slice(0, -(itemSource.length + 2)).trim();
    }

    const rawDate =
      field(b, 'pubDate') || field(b, 'published') || field(b, 'updated') || '';
    const date =
      rawDate && !Number.isNaN(Date.parse(rawDate))
        ? new Date(rawDate).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10);
    const summaryRaw =
      field(b, 'description') || field(b, 'summary') || field(b, 'content') || '';
    const category =
      feed.category === 'pro' && YOUTH_HINTS.test(`${title} ${summaryRaw}`)
        ? 'youth'
        : feed.category;

    out.push({
      id: `feed-${Buffer.from(title).toString('base64url').slice(0, 28)}`,
      title,
      url,
      source: itemSource || feed.source,
      sourceUrl: safeOrigin(url),
      category,
      date,
      summary:
        summaryRaw && !/^\s*$/.test(summaryRaw)
          ? summaryRaw.slice(0, 220)
          : `${title}.`,
    });
  }
  return out;
}

function safeOrigin(url) {
  try {
    return new URL(url).origin;
  } catch {
    return '';
  }
}

async function fetchFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      headers: { 'User-Agent': BROWSER_UA, Accept: 'application/rss+xml, application/xml, text/xml, */*' },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const items = parseFeed(xml, feed);
    console.log(`  ✓ ${feed.source} (${feed.category}): ${items.length} items`);
    return items;
  } catch (err) {
    console.warn(`  ✗ ${feed.url}: ${err.message}`);
    return [];
  }
}

function normTitle(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function dedupe(items) {
  const seen = new Set();
  const out = [];
  for (const it of items) {
    const key = normTitle(it.title) || (it.url || '').toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(it);
  }
  return out;
}

async function main() {
  console.log('Refreshing youth soccer news…');

  const existing = JSON.parse(await readFile(NEWS_PATH, 'utf8'));
  const seed = Array.isArray(existing.items) ? existing.items : [];

  const fetched = (await Promise.all(FEEDS.map(fetchFeed))).flat();

  if (fetched.length === 0) {
    console.log('No feeds reachable — keeping existing news.json unchanged.');
    return;
  }

  // Fresh items first, then seed as backfill; de-dupe, sort newest first.
  const all = dedupe([...fetched, ...seed]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // Enforce ~90% youth: take youth first, then up to MAX_PRO pros.
  const youth = all.filter((i) => i.category === 'youth');
  const pro = all.filter((i) => i.category === 'pro');
  const chosen = [
    ...youth.slice(0, MAX_ITEMS - Math.min(MAX_PRO, pro.length)),
    ...pro.slice(0, MAX_PRO),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_ITEMS);

  const payload = {
    lastUpdated: new Date().toISOString(),
    note: existing.note,
    items: chosen,
  };

  await writeFile(NEWS_PATH, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  console.log(
    `Wrote ${chosen.length} articles (${chosen.filter((i) => i.category === 'youth').length} youth / ${chosen.filter((i) => i.category === 'pro').length} pro).`,
  );
}

/**
 * Deterministic parser self-test (no network). Run: `node fetch-news.mjs --selftest`.
 * Validates Google News RSS parsing (title de-suffixing, source, link, category)
 * and standard RSS parsing, so CI can verify the feed logic offline.
 */
function selftest() {
  const gnewsSample = `<rss><channel>
    <item>
      <title>Local club earns ECNL promotion - SoccerWire</title>
      <link>https://news.google.com/rss/articles/ABC123</link>
      <pubDate>Fri, 29 May 2026 12:00:00 GMT</pubDate>
      <description>&lt;a href="https://x"&gt;Local club earns ECNL promotion&lt;/a&gt;&nbsp;SoccerWire</description>
      <source url="https://www.soccerwire.com">SoccerWire</source>
    </item>
  </channel></rss>`;
  const proSample = `<rss><channel>
    <item>
      <title>NWSL expansion news - ESPN</title>
      <link>https://news.google.com/rss/articles/XYZ789</link>
      <pubDate>Thu, 28 May 2026 09:00:00 GMT</pubDate>
      <description>Pro league roundup</description>
      <source url="https://espn.com">ESPN</source>
    </item>
  </channel></rss>`;

  const a = parseFeed(gnewsSample, { source: 'Google News', category: 'youth' })[0];
  const b = parseFeed(proSample, { source: 'Google News', category: 'pro' })[0];

  const checks = [
    [a.title === 'Local club earns ECNL promotion', `title de-suffix: "${a?.title}"`],
    [a.source === 'SoccerWire', `source from <source>: "${a?.source}"`],
    [a.url === 'https://news.google.com/rss/articles/ABC123', `link: "${a?.url}"`],
    [a.date === '2026-05-29', `date: "${a?.date}"`],
    [a.category === 'youth', `category youth: "${a?.category}"`],
    [b.title === 'NWSL expansion news', `pro title: "${b?.title}"`],
    [b.category === 'pro', `category pro: "${b?.category}"`],
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
    console.error('news refresh failed:', err);
    process.exit(0); // never fail the pipeline over news
  });
}
