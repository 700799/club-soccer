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
  { url: gnews('"Bay Area" high school soccer'), category: 'local' },
  { url: gnews('"San Jose" OR "San Francisco" youth soccer'), category: 'local' },
  { url: gnews('"Oakland" youth soccer California -Michigan -Indiana'), category: 'local' },
  { url: gnews('"Sacramento" youth soccer club'), category: 'local' },
  { url: gnews('NorCal ECNL OR "ECNL NorCal"'), category: 'local' },
  // National tournaments / college recruiting
  { url: gnews('ECNL nationals youth soccer'), category: 'national' },
  { url: gnews('"US Youth Soccer" nationals tournament'), category: 'national' },
  { url: gnews('youth soccer college commitment recruit'), category: 'national' },
  { url: gnews('"MLS NEXT" youth soccer tournament'), category: 'national' },
];

// Recognise clearly NorCal/local content even when pulled from a national query.
// The (?<!green ) lookbehind stops "Green Bay area" (Wisconsin) matching "bay area".
// The (?!\s+(count|city|press|christian)) lookahead stops Michigan false positives:
//   "Oakland County" (Oakland County, MI), "Oakland City" (IN),
//   "Oakland Press" (The Oakland Press, Michigan newspaper whose name
//    appears in article summaries), and "Oakland Christian" (Michigan school).
const LOCAL_HINTS =
  /\b(norcal|nor cal|(?<!green )bay area|northern california|cal north|california north|san francisco|san jose|oakland(?!\s+(count|city|press|christian))|sacramento|marin|contra costa|alameda|santa clara|fresno|stockton|modesto|napa|sonoma|solano|east bay|peninsula|silicon valley|fremont|berkeley|palo alto|mountain view|livermore|pleasanton|dublin|san ramon|danville|davis|roseville|folsom|elk grove|santa rosa|petaluma|san mateo|redwood city|sunnyvale|milpitas|hayward|concord|walnut creek)\b/i;

// This is a SOCCER site: every item must clearly be about soccer/futsal. This
// drops generic "high school sports results" and off-topic local crime/news that
// only matched on a city name (e.g. an Oakland stabbing from the "Oakland" query).
const SOCCER_RE =
  /\b(soccer|futsal|ecnl|ecrl|mls next|npl|usl|girls academy|goalkeeper|midfielder)\b/i;

// Other-region city/state names that collide with the broad NorCal queries.
// "michigan", "indiana", "ohio" are absolute wrong-state signals — no NorCal
// youth soccer article uses these state names. Michigan-specific terms
// (auburn hills, walled lake, mihssca, oakland county) catch common false
// positives from the "Oakland" query.
const NON_NORCAL =
  /\b(green bay|bay city|tampa bay|morro bay|wisconsin|michigan|indiana|ohio|auburn hills|walled lake|mihssca|oakland county)\b/i;

// Parenthetical non-CA state abbreviation in title/text (MaxPreps style):
// e.g. "(Oakland City, IN)" or "(Auburn Hills, MI)". Absolute drop.
const TITLE_NON_CA =
  /\([^)]+,\s*(MI|IN|OH|WI|IL|MN|TX|FL|GA|PA|VA|NC|NY|NJ|MA|CT|WA|OR|AZ|NV|UT|CO|ID|MT|WY|SD|ND|NE|KS|OK|AR|LA|MS|AL|TN|KY|WV|MD|DE|RI|NH|VT|ME|AK|HI)\b/;

// Stories where "soccer" appears tangentially — not as the subject.
// E.g. immigration/detention stories about players that happen to have a team.
const OFF_TOPIC_DROP = /\bdetained by ice\b|\bice detention\b|\bice detain/i;

// Pro / senior-team coverage we never want (this is a youth site). Drop an item
// matching these unless it clearly carries a youth/academy signal.
const PRO_DROP =
  /\b(nwsl|uswnt|usmnt|mls cup|premier league|la liga|serie a|bundesliga|ligue 1|champions league|world cup|ballon d'?or|professional contract)\b/i;
const YOUTH_KEEP =
  /\b(youth|academy|ecnl|ecrl|mls next|npl|u1[0-9]|u-1[0-9]|high school|college commit|recruit|club soccer|girls academy|homegrown)\b/i;

/**
 * Quality gate shared by fresh items AND existing seed items: must be about
 * soccer, must not be an other-region "bay"/city false positive, and must not be
 * pro/senior coverage. Applied to seed too, so any bad items already in
 * news.json get purged on the next run.
 */
function passesQuality(text) {
  if (!SOCCER_RE.test(text)) return false;
  if (OFF_TOPIC_DROP.test(text)) return false;
  if (TITLE_NON_CA.test(text)) return false;
  if (NON_NORCAL.test(text) && !LOCAL_HINTS.test(text)) return false;
  if (PRO_DROP.test(text) && !YOUTH_KEEP.test(text)) return false;
  return true;
}

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

    // For local-labeled feed items, require actual NorCal geography. Local
    // queries (e.g. "Oakland youth soccer") can return Michigan results
    // ("Oakland County", "Oakland Christian") that pass topic/pro filters but
    // have no California geography in the text.
    if (feed.category === 'local' && !LOCAL_HINTS.test(combined)) continue;

    // Must be on-topic soccer, in-region, and youth (not pro).
    if (!passesQuality(combined)) continue;

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
  // Re-run the quality gate over existing items so anything that slipped in
  // before this filter existed gets dropped on this run. Local items must also
  // have NorCal geography — the same requirement we impose on new local-feed items.
  const seed = (Array.isArray(existing.items) ? existing.items : []).filter((it) => {
    const text = `${it.title ?? ''} ${it.summary ?? ''}`;
    if (!passesQuality(text)) return false;
    if (it.category === 'local' && !LOCAL_HINTS.test(text)) return false;
    return true;
  });

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
  // Entity-encoded HTML in description (the clean() fix) + a real soccer term.
  const gnewsSample = `<rss><channel>
    <item>
      <title>Bay Area soccer club wins NorCal championship - SoccerWire</title>
      <link>https://news.google.com/rss/articles/ABC123</link>
      <pubDate>Fri, 29 May 2026 12:00:00 GMT</pubDate>
      <description>&lt;a href="https://x"&gt;Bay Area soccer club wins NorCal championship&lt;/a&gt;&nbsp;SoccerWire</description>
      <source url="https://www.soccerwire.com">SoccerWire</source>
    </item>
  </channel></rss>`;
  const nationalSample = `<rss><channel>
    <item>
      <title>ECNL nationals soccer bracket released - TopDrawer</title>
      <link>https://news.google.com/rss/articles/XYZ789</link>
      <pubDate>Thu, 28 May 2026 09:00:00 GMT</pubDate>
      <description>National youth soccer tournament roundup with no local mentions</description>
      <source url="https://topdrawersoccer.com">TopDrawer</source>
    </item>
  </channel></rss>`;

  // Clearly-pro (has a soccer term so it reaches the PRO_DROP gate). Dropped.
  const proSample = `<rss><channel>
    <item>
      <title>NWSL soccer: Pride's Banda scores twice in win - ESPN</title>
      <link>https://news.google.com/rss/articles/PRO111</link>
      <pubDate>Thu, 28 May 2026 09:00:00 GMT</pubDate>
      <description>NWSL professional soccer scoring leader nets a brace</description>
      <source url="https://espn.com">ESPN</source>
    </item>
  </channel></rss>`;

  // Green Bay, WI high-school sports: NOT soccer, and "Green Bay area" must not be
  // read as the SF "Bay Area". Dropped.
  const greenBaySample = `<rss><channel>
    <item>
      <title>Green Bay area high school sports results for Thursday - Press-Gazette</title>
      <link>https://news.google.com/rss/articles/GB1</link>
      <pubDate>Thu, 28 May 2026 09:00:00 GMT</pubDate>
      <description>Roundup of area results</description>
      <source url="https://packersnews.com">Press-Gazette</source>
    </item>
  </channel></rss>`;

  // Bay City, MI soccer: on-topic but wrong region. Dropped.
  const bayCitySample = `<rss><channel>
    <item>
      <title>Bay City area soccer roundup: Garber, Standish reach title round - MLive</title>
      <link>https://news.google.com/rss/articles/BC1</link>
      <pubDate>Wed, 27 May 2026 09:00:00 GMT</pubDate>
      <description>Michigan high school soccer results</description>
      <source url="https://mlive.com">MLive</source>
    </item>
  </channel></rss>`;

  // Oakland (NorCal) but NOT about soccer — off-topic crime. Dropped.
  const crimeSample = `<rss><channel>
    <item>
      <title>Family mourns 19-year-old fatally stabbed near Oakland park - KTVU</title>
      <link>https://news.google.com/rss/articles/CR1</link>
      <pubDate>Tue, 26 May 2026 09:00:00 GMT</pubDate>
      <description>Local crime report</description>
      <source url="https://ktvu.com">KTVU</source>
    </item>
  </channel></rss>`;

  // Oakland County, MI — no NorCal geography; fails local-feed check AND NON_NORCAL.
  const oaklandCountySample = `<rss><channel>
    <item>
      <title>Girls soccer 2026 district pairings for Oakland County teams - The Oakland Press</title>
      <link>https://news.google.com/rss/articles/OAKCO1</link>
      <pubDate>Mon, 01 Jun 2026 10:00:00 GMT</pubDate>
      <description>Oakland County high school girls soccer district pairings for 2026</description>
      <source url="https://theoaklandpress.com">The Oakland Press</source>
    </item>
  </channel></rss>`;

  // Parenthetical non-CA state "(Oakland City, IN)" — caught by TITLE_NON_CA
  // even though "San Jose" passes LOCAL_HINTS.
  const stateParenSample = `<rss><channel>
    <item>
      <title>San Jose vs Wood Memorial (Oakland City, IN) Girls Soccer - MaxPreps</title>
      <link>https://news.google.com/rss/articles/STAT1</link>
      <pubDate>Sun, 31 May 2026 10:00:00 GMT</pubDate>
      <description>Girls soccer match results</description>
      <source url="https://maxpreps.com">MaxPreps</source>
    </item>
  </channel></rss>`;

  // ICE detention — "soccer" is tangential; caught by OFF_TOPIC_DROP and
  // fails local-feed LOCAL_HINTS check (no NorCal geography).
  const iceSample = `<rss><channel>
    <item>
      <title>CPS student detained by ICE for 2 months reunites with high school soccer team - CBS News</title>
      <link>https://news.google.com/rss/articles/ICE1</link>
      <pubDate>Tue, 27 May 2026 10:00:00 GMT</pubDate>
      <description>A student detained by ICE has reunited with his high school soccer team</description>
      <source url="https://cbsnews.com">CBS News</source>
    </item>
  </channel></rss>`;

  const a = parseFeed(gnewsSample, { category: 'local' })[0];
  const b = parseFeed(nationalSample, { category: 'national' })[0];
  const pro = parseFeed(proSample, { category: 'national' });
  const greenBay = parseFeed(greenBaySample, { category: 'local' });
  const bayCity = parseFeed(bayCitySample, { category: 'local' });
  const crime = parseFeed(crimeSample, { category: 'local' });
  const oaklandCounty = parseFeed(oaklandCountySample, { category: 'local' });
  const stateParen = parseFeed(stateParenSample, { category: 'local' });
  const iceDetention = parseFeed(iceSample, { category: 'local' });

  const checks = [
    [pro.length === 0, `pro NWSL item dropped (got ${pro.length})`],
    [greenBay.length === 0, `Green Bay WI dropped — non-soccer + false "bay area" (got ${greenBay.length})`],
    [bayCity.length === 0, `Bay City MI soccer dropped — wrong region (got ${bayCity.length})`],
    [crime.length === 0, `Oakland crime dropped — off-topic (got ${crime.length})`],
    [oaklandCounty.length === 0, `Oakland County MI dropped — wrong region (got ${oaklandCounty.length})`],
    [stateParen.length === 0, `"(Oakland City, IN)" parenthetical dropped (got ${stateParen.length})`],
    [iceDetention.length === 0, `ICE detention story dropped — off-topic (got ${iceDetention.length})`],
    [a?.title === 'Bay Area soccer club wins NorCal championship', `title de-suffix: "${a?.title}"`],
    [a?.source === 'SoccerWire', `source: "${a?.source}"`],
    [a?.url === 'https://news.google.com/rss/articles/ABC123', `link: "${a?.url}"`],
    [a?.date === '2026-05-29', `date: "${a?.date}"`],
    [a?.category === 'local', `category local: "${a?.category}"`],
    // Key fix: description must NOT contain raw HTML tags
    [a && !a.summary.includes('<a '), `summary clean (no <a> tag): "${a?.summary}"`],
    [b?.title === 'ECNL nationals soccer bracket released', `national title: "${b?.title}"`],
    [b?.category === 'national', `category national: "${b?.category}"`],
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
} else if (process.argv.includes('--purge')) {
  // Apply the quality gate to the existing news.json in place (no network).
  // Immediately drops items that pre-date a filter change, instead of waiting
  // for the next scheduled run. Run: node fetch-news.mjs --purge
  (async () => {
    const existing = JSON.parse(await readFile(NEWS_PATH, 'utf8'));
    const items = Array.isArray(existing.items) ? existing.items : [];
    const kept = items.filter((it) => {
      const text = `${it.title ?? ''} ${it.summary ?? ''}`;
      if (!passesQuality(text)) return false;
      if (it.category === 'local' && !LOCAL_HINTS.test(text)) return false;
      return true;
    });
    for (const it of items) {
      if (!kept.includes(it)) console.log(`  ✗ dropped: ${it.title}`);
    }
    await writeFile(
      NEWS_PATH,
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
    console.error('news refresh failed:', err);
    process.exit(0);
  });
}
