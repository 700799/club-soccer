#!/usr/bin/env node
/**
 * Daily youth-soccer news refresher.
 *
 * Runs in GitHub Actions (Node 20+, global fetch). Pulls a handful of RSS feeds,
 * keeps the mix ~90% youth / ~10% pro, merges with the existing seed items,
 * de-dupes, and writes data/news.json. Dependency-free on purpose.
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

/** feeds: category is the default; youth keywords can still promote pro→youth */
const FEEDS = [
  { url: 'https://www.soccerwire.com/feed/', source: 'SoccerWire', category: 'youth' },
  { url: 'https://www.soccerwire.com/league/mls-youth-academy/feed/', source: 'SoccerWire · MLS NEXT', category: 'youth' },
  { url: 'https://www.soccerwire.com/recruiting/feed/', source: 'SoccerWire · Recruiting', category: 'youth' },
  { url: 'https://norcalpremier.com/feed/', source: 'NorCal Premier', category: 'youth' },
  { url: 'https://www.espn.com/espn/rss/soccer/news', source: 'ESPN Soccer', category: 'pro' },
];

const YOUTH_HINTS =
  /\b(youth|academy|ecnl|ecrl|mls next|npl|u1[3-9]|u-1[3-9]|college|commit|recruit|high school|girls academy|ga\b|usl academy|homegrown)\b/i;

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
    const title = field(b, 'title');
    const url = linkOf(b);
    if (!title || !url) continue;
    const rawDate =
      field(b, 'pubDate') || field(b, 'published') || field(b, 'updated') || '';
    const date = rawDate && !Number.isNaN(Date.parse(rawDate))
      ? new Date(rawDate).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10);
    const summary =
      field(b, 'description') || field(b, 'summary') || field(b, 'content') || '';
    const category =
      feed.category === 'pro' && YOUTH_HINTS.test(`${title} ${summary}`)
        ? 'youth'
        : feed.category;
    out.push({
      id: `feed-${Buffer.from(url).toString('base64url').slice(0, 24)}`,
      title,
      url,
      source: feed.source,
      sourceUrl: new URL(url).origin,
      category,
      date,
      summary: summary.slice(0, 240),
    });
  }
  return out;
}

async function fetchFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      headers: { 'User-Agent': 'NorCalSoccerGuide/1.0 (+news refresher)' },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const items = parseFeed(xml, feed);
    console.log(`  ✓ ${feed.source}: ${items.length} items`);
    return items;
  } catch (err) {
    console.warn(`  ✗ ${feed.source}: ${err.message}`);
    return [];
  }
}

function dedupe(items) {
  const seen = new Set();
  const out = [];
  for (const it of items) {
    const key = (it.url || it.title).toLowerCase().replace(/\/+$/, '');
    if (seen.has(key)) continue;
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

  // Combine fresh + seed, de-dupe, sort newest first.
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

main().catch((err) => {
  console.error('news refresh failed:', err);
  process.exit(0); // never fail the pipeline over news
});
