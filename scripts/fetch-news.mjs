#!/usr/bin/env node
/**
 * Daily NorCal soccer news refresher.
 *
 * Pulls from Google News RSS with NorCal-focused queries. Default view is local
 * NorCal news (championships, high school, club events). National tournament
 * coverage is kept separately (~25% of feed). Categories: "local" | "national".
 *
 * Defensive: any failing feed is skipped; if ALL fail, existing news.json is
 * kept untouched.
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const NEWS_PATH = join(__dirname, '..', 'data', 'news.json');

const MAX_ITEMS = 24;
const MAX_NATIONAL = 6;

const BROWSER_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const gnews = (q) =>
  `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-US&gl=US&ceid=US:en`;

const FEEDS = [
  // NorCal local
  { url: gnews('"NorCal Premier" soccer'), category: 'local' },
  { url: gnews('"Bay Area" youth soccer'), category: 'local' },
  { url: gnews('"Northern California" youth soccer championship'), category: 'local' },
  { url: gnews('Cal North soccer OR "California North" soccer'), category: 'local' },
  { url: gnews('Bay Area high school soccer'), category: 'local' },
  { url: gnews('"San Jose" OR "San Francisco" OR "Oakland" youth soccer'), category: 'local' },
  { url: gnews('"Sacramento" youth soccer club'), category: 'local' },
  { url: gnews('NorCal ECNL OR "ECNL NorCal"'), category: 'local' },
  // National tournaments / college recruiting
  { url: gnews('ECNL nationals youth soccer'), category: 'national' },
  { url: gnews('"US Youth Soccer" nationals tournament'), category: 'national' },
  { url: gnews('youth soccer college commitment recruit'), category: 'national' },
  { url: gnews('"MLS NEXT" youth soccer tournament'), category: 'national' },
];

// Recognise clearly NorCal/local content even when pulled from national query.
const LOCAL_HINTS =
  /\b(norcal|nor cal|bay area|northern california|cal north|california north|san jose|san francisco|oakland|sacramento|marin|contra costa|alameda|santa clara|fresno|stockton|modesto|napa|sonoma|solano|east bay)\b/i;

// Pro / senior-team coverage we never want (this is a youth site). Drop an item
// matching these unless it clearly carries a youth/academy signal.
const PRO_DROP =
  /\b(nwsl|uswnt|usmnt|mls cup|premier league|la liga|serie a|bundesliga|ligue 1|champions league|world cup|ballon d'?or|professional contract)\b/i;
const YOUTH_KEEP =
  /\b(youth|academy|ecnl|ecrl|mls next|npl|u1[0-9]|u-1[0-9]|high school|college commit|recruit|club soccer|girls academy|homegrown)\b/i;

function clean(s = '') {
  return (
    s
      // 1. unwrap CDATA
      .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
      // 2. decode < > BEFORE stripping tags so entity-encoded HTML gets stripped too
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      // 3. strip all HTML tags
      .replace(/<[^>]+>/g, ' ')
      // 4. decode remaining entities
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#0?39;|&apos;|&#x27;/g, "'")
      .replace(/&#0?38;/g, '&')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  );
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

function parseFeed(xml, feed) {
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

    const rawDate =
      field(b, 'pubDate') || field(b, 'published') || field(b, 'updated') || '';
    const date =
      rawDate && !Number.isNaN(Date.parse(rawDate))
        ? new Date(rawDate).toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10);

    const summaryRaw =
      field(b, 'description') || field(b, 'summary') || field(b, 'content') || '';

    const combined = `${title} ${summaryRaw}`;

    // Youth-only site: skip anything clearly about pro/senior soccer.
    if (PRO_DROP.test(combined) && !YOUTH_KEEP.test(combined)) continue;

    // Promote to local if the text mentions NorCal geography, even from a national feed.
    const category =
      feed.category === 'national' && LOCAL_HINTS.test(combined) ? 'local' : feed.category;

    const summary =
      summaryRaw && !/^\s*$/.test(summaryRaw)
        ? summaryRaw.slice(0, 220)
        : `${title}.`;

    out.push({
      id: `feed-${Buffer.from(title).toString('base64url').slice(0, 28)}`,
      title,
      url,
      source: itemSource || 'Google News',
      sourceUrl: safeOrigin(url),
      category,
      date,
      summary,
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
      headers: {
        'User-Agent': BROWSER_UA,
        Accept: 'application/rss+xml, application/xml, text/xml, */*',
      },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const items = parseFeed(xml, feed);
    console.log(`  ✓ (${feed.category}): ${items.length} items`);
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
  console.log('Refreshing NorCal soccer news…');

  const existing = JSON.parse(await readFile(NEWS_PATH, 'utf8'));
  const seed = Array.isArray(existing.items) ? existing.items : [];

  const fetched = (await Promise.all(FEEDS.map(fetchFeed))).flat();

  if (fetched.length === 0) {
    console.log('No feeds reachable — keeping existing news.json unchanged.');
    return;
  }

  const all = dedupe([...fetched, ...seed]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const local = all.filter((i) => i.category === 'local');
  const national = all.filter((i) => i.category === 'national');
  const chosen = [
    ...local.slice(0, MAX_ITEMS - Math.min(MAX_NATIONAL, national.length)),
    ...national.slice(0, MAX_NATIONAL),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_ITEMS);

  const payload = {
    lastUpdated: new Date().toISOString(),
    items: chosen,
  };

  await writeFile(NEWS_PATH, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  console.log(
    `Wrote ${chosen.length} articles (${chosen.filter((i) => i.category === 'local').length} local / ${chosen.filter((i) => i.category === 'national').length} national).`,
  );
}

/**
 * Self-test (no network). Run: `node fetch-news.mjs --selftest`
 */
function selftest() {
  // Entity-encoded HTML in description (the bug this clean() fix addresses)
  const gnewsSample = `<rss><channel>
    <item>
      <title>Bay Area club wins NorCal championship - SoccerWire</title>
      <link>https://news.google.com/rss/articles/ABC123</link>
      <pubDate>Fri, 29 May 2026 12:00:00 GMT</pubDate>
      <description>&lt;a href="https://x"&gt;Bay Area club wins NorCal championship&lt;/a&gt;&nbsp;SoccerWire</description>
      <source url="https://www.soccerwire.com">SoccerWire</source>
    </item>
  </channel></rss>`;
  const nationalSample = `<rss><channel>
    <item>
      <title>ECNL nationals bracket released - TopDrawer</title>
      <link>https://news.google.com/rss/articles/XYZ789</link>
      <pubDate>Thu, 28 May 2026 09:00:00 GMT</pubDate>
      <description>National tournament roundup with no local mentions</description>
      <source url="https://topdrawersoccer.com">TopDrawer</source>
    </item>
  </channel></rss>`;

  // A clearly-pro item that should be dropped entirely (no youth signal).
  const proSample = `<rss><channel>
    <item>
      <title>NWSL: Pride's Banda scores twice in win - ESPN</title>
      <link>https://news.google.com/rss/articles/PRO111</link>
      <pubDate>Thu, 28 May 2026 09:00:00 GMT</pubDate>
      <description>NWSL scoring leader nets a brace</description>
      <source url="https://espn.com">ESPN</source>
    </item>
  </channel></rss>`;

  const a = parseFeed(gnewsSample, { category: 'local' })[0];
  const b = parseFeed(nationalSample, { category: 'national' })[0];
  const pro = parseFeed(proSample, { category: 'national' });

  const checks = [
    [pro.length === 0, `pro NWSL item dropped (got ${pro.length})`],
    [a.title === 'Bay Area club wins NorCal championship', `title de-suffix: "${a?.title}"`],
    [a.source === 'SoccerWire', `source: "${a?.source}"`],
    [a.url === 'https://news.google.com/rss/articles/ABC123', `link: "${a?.url}"`],
    [a.date === '2026-05-29', `date: "${a?.date}"`],
    [a.category === 'local', `category local: "${a?.category}"`],
    // Key fix: description must NOT contain raw HTML tags
    [!a.summary.includes('<a '), `summary clean (no <a> tag): "${a?.summary}"`],
    [b.title === 'ECNL nationals bracket released', `national title: "${b?.title}"`],
    [b.category === 'national', `category national: "${b?.category}"`],
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
    process.exit(0);
  });
}
