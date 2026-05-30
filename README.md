# ⚽ NorCal Soccer Guide

A standalone, statically-exported **Next.js** web app (built for **GitHub Pages**)
that explains the full Northern California **boys** youth-soccer pathway, what each
level costs, where to find live standings, how to prevent injuries, and how to pick
the right **Superfeet** or **Currex** insole for your feet.

It is designed to run as an **affiliate site** for soccer insoles.

## What's inside

A single, polished long-form page with a **floating navigation menu** (a scroll-spy
dock on desktop, a floating pill on mobile) covering:

1. **Levels of soccer** — an interactive pyramid from Rec → Select → NorCal Premier
   (Copper → Bronze → Silver → Gold → Premier) → NPL → ECNL Regional League
   (NorCal & Golden State) → ECNL → MLS NEXT → the pro pathway, each with
   expectations, governing body, ages, travel and selectivity.
2. **Costs & expectations** — club-dues vs. all-in annual cost for every level.
3. **Standings & records** — deep links to each league's **official live standings**
   (the source of truth for win/loss records) plus a verified NorCal club directory.
4. **Injuries & prevention** — injury stats **by age** (ACL incidence U13→U20),
   common youth injuries, and the evidence-based FIFA 11+ prevention checklist.
5. **Find your insole** — an interactive finder (foot type → arch support → firmness
   → goal) that recommends Superfeet/Currex products, plus a brand head-to-head.
   All product links run through your affiliate tag.
6. **Latest news** — a daily-refreshed feed (~90% youth, ~10% pro) with previews and
   links, updated automatically by a scheduled GitHub Action.

## Tech

- **Next.js 14** (App Router) with `output: 'export'` → fully static HTML/CSS/JS.
- **Tailwind CSS** + **TypeScript**.
- No runtime backend. All data lives in `/data` as typed TS / JSON.
- Daily news refresh via a dependency-free Node script + GitHub Actions cron.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

Build the static site locally:

```bash
npm run build    # outputs to ./out
npx serve out    # preview the static export
```

Refresh the news feed locally:

```bash
npm run fetch-news
```

## Deploying to GitHub Pages

1. Push to the **`main`** branch (open a PR from your feature branch and merge).
2. In **Settings → Pages**, set **Source: GitHub Actions**.
3. The `Deploy to GitHub Pages` workflow builds and publishes automatically.

The site is served from `https://<owner>.github.io/<repo>/`. The build derives the
`basePath` from the repo name automatically; for a custom domain, set the
`PAGES_BASE_PATH` env (e.g. `""`) in `.github/workflows/deploy.yml`.

## Daily updates

`.github/workflows/update-news.yml` runs every morning (13:30 UTC), executes
`scripts/fetch-news.mjs` to pull youth-soccer RSS feeds (SoccerWire, NorCal Premier,
ESPN, …), keeps the mix ~90% youth, commits `data/news.json` if it changed, and the
resulting push triggers a fresh Pages deploy. Scheduled Actions run from `main`, so
this activates once the workflow is on the default branch.

> Note: scheduled workflows only run after the workflow file exists on the default
> branch, and GitHub may pause schedules on repos with no recent activity.

## Affiliate setup (important)

All insole links route through `withRef()` in [`data/insoles.ts`](data/insoles.ts).
Drop your real affiliate IDs into `AFFILIATE_TAGS` once and every link updates:

```ts
export const AFFILIATE_TAGS = {
  superfeet: { param: 'utm_source', value: 'YOUR_ID' },
  currex:    { param: 'ref',        value: 'YOUR_ID' },
};
```

- Superfeet affiliate program: <https://www.superfeet.com/pages/affiliates>
- Currex partner/affiliate: <https://currex.com/>

A visible **FTC affiliate disclosure** is included (required for affiliate sites).

## A note on accuracy (standings)

Youth standings change every weekend and league membership re-shuffles yearly. To
stay **accurate**, this site does **not** hard-code win/loss numbers that would be
wrong within days. Instead it links to each league's **official live standings**
(GotSport for NorCal Premier/NPL, theECNL.com for ECNL/ECRL, MLSsoccer.com for MLS
NEXT) and keeps a verified, dated club directory. To embed live tables directly,
wire those official providers' data into `data/clubs.ts`.

## Data sources

League structure, costs and stats are sourced from NorCal Premier, theECNL.com, MLS
NEXT / Cal North, US Club Soccer, and peer-reviewed sports-medicine literature on
youth soccer injuries. See inline source comments in each file under `/data`.

---

*Independent guide — not affiliated with NorCal Premier, ECNL, US Club Soccer or
MLS. Educational content only; not medical advice.*
