// ---------------------------------------------------------------------------
// Professional pathway: the youth→pro funnel, pro salaries, and NIL.
//
// Sources (verified May 2026):
//  - MLS 2025 salaries (min/reserve/max + average):
//    https://mlsplayers.org/resources/salary-guide ,
//    https://phillysoccerpage.net/2025/01/08/mls-salary-cap-details-updated-to-2025/
//  - NWSL 2025 salaries (min, no max, cap):
//    https://justwomenssports.com/reads/nwsl-raises-player-salary-cap-pay-ahead-of-2025-season-kick-off/ ,
//    https://www.spotrac.com/nwsl/contracts
//  - Funnel odds (HS→college→pro), NCAA & aggregators:
//    https://www.ncaa.org/sports/2015/3/2/estimated-probability-of-competing-in-college-athletics.aspx ,
//    https://warubi-sports.com/college-soccer-odds/ , https://exactsports.com/how-many-college-soccer-players-go-pro/
//  - NIL / House v. NCAA revenue sharing:
//    https://honestgame.com/blog/house-vs-the-ncaa/ , https://nil-ncaa.com/
//
// All figures are approximate and change year to year — they're here to set
// realistic expectations, not as financial advice.
// ---------------------------------------------------------------------------

// The funnel from youth soccer to the pros. `share` is the approximate % of the
// level BELOW that reaches this level (or, where noted, % of the HS pool). The
// widths drive the pyramid graphic.
export interface FunnelStage {
  label: string;
  approx: string;       // human-readable scope
  detail: string;
  widthPct: number;     // pyramid row width
  color: string;
}

export const funnelStages: FunnelStage[] = [
  {
    label: 'Elementary / Rec',
    approx: 'Millions of kids',
    detail:
      'Where almost everyone starts — AYSO and local rec. Pure participation; the base of the entire sport.',
    widthPct: 100,
    color: '#94a3b8',
  },
  {
    label: 'Youth Club / Travel',
    approx: 'Hundreds of thousands',
    detail:
      'Players who move into competitive club soccer (in NorCal, NorCal Premier and up).',
    widthPct: 78,
    color: '#22c55e',
  },
  {
    label: 'High School Varsity',
    approx: '~450,000 boys play HS soccer (US)',
    detail:
      'A large pool — but the narrowing starts here. Most players\' competitive careers top out around this level.',
    widthPct: 58,
    color: '#16a34a',
  },
  {
    label: 'College (any level)',
    approx: '≈ 9–10% of HS players',
    detail:
      'NCAA D1/D2/D3, NAIA and junior college combined. Roughly 1 in 10 high-school players competes in college at some level.',
    widthPct: 38,
    color: '#0ea5e9',
  },
  {
    label: 'NCAA Division I',
    approx: '≈ 0.9% of HS players',
    detail:
      'Fewer than 1 in 100 high-school players make a D1 roster. This is the elite college tier scouts watch most.',
    widthPct: 22,
    color: '#6366f1',
  },
  {
    label: 'Professional',
    approx: '≈ 1 in 1,100 HS players reach MLS',
    detail:
      'Only ~1–2% of D1 seniors are drafted/sign domestically (more sign abroad). From the whole HS pool, roughly 1 in 1,100 reaches MLS. The very tip of the pyramid.',
    widthPct: 9,
    color: '#ef4444',
  },
];

export const funnelTakeaway =
  'The point of this pyramid isn\'t to discourage anyone — it\'s perspective. The odds of going pro are tiny, so the smart play is to chase development, education and a lifelong love of the game. A college scholarship (or just playing in college) is a far more realistic and valuable goal than a pro contract — and the habits that get you there pay off for life.';

export interface SalaryLeague {
  league: string;
  gender: string;
  min: string;
  average: string;
  max: string;
  note: string;
  url: string;
  accent: string;
}

export const proSalaries: SalaryLeague[] = [
  {
    league: 'MLS (men)',
    gender: 'Men · Major League Soccer',
    min: '$104,000 senior roster ($80,622 reserve)',
    average: '≈ $354,000 / year',
    max: '$743,750 (max-budget charge); Designated Players earn far more',
    note:
      'Averages are skewed upward by a few superstars. Most non-DP players earn well below the average — many young pros are near the minimum. MLS NEXT Pro (the reserve league) pays considerably less.',
    url: 'https://mlsplayers.org/resources/salary-guide',
    accent: '#ef4444',
  },
  {
    league: 'NWSL (women)',
    gender: 'Women · National Women\'s Soccer League',
    min: '$48,500 / year (2025)',
    average: 'Low six figures typical; wide range',
    max: 'No individual max; team salary cap ≈ $3.3M (2025)',
    note:
      'NWSL pay has risen fast but trails MLS. Many players supplement income; stars negotiate well above the minimum. The Bay Area\'s Bay FC competes here.',
    url: 'https://justwomenssports.com/reads/nwsl-raises-player-salary-cap-pay-ahead-of-2025-season-kick-off/',
    accent: '#ec4899',
  },
];

export const salaryReality = [
  'Averages mislead: a handful of Designated Players (and international stars) pull the MLS average up to ~$354k, but a typical young pro earns close to the league minimum.',
  'Most paid soccer careers are short — a few years — so the education and life skills you build along the way matter enormously.',
  'Reserve/developmental tiers (MLS NEXT Pro, lower divisions) pay much less than the top-flight figures above.',
];

export interface NilFact {
  title: string;
  detail: string;
}

export const nilFacts: NilFact[] = [
  {
    title: 'What NIL is',
    detail:
      'Since 2021, college athletes can earn from their Name, Image & Likeness — sponsorships, social media, camps, autographs and appearances — without losing eligibility. It\'s real money for some, but it is NOT a salary from the school for playing.',
  },
  {
    title: 'Revenue sharing arrived in 2025 (House v. NCAA)',
    detail:
      'The House settlement now lets schools pay athletes directly, starting around $20.5M per school per year. But football and men\'s basketball are projected to take ~90%+ of that pool.',
  },
  {
    title: 'Where soccer fits',
    detail:
      'Soccer is a "non-revenue" sport at almost every school, so revenue-share dollars and NIL deals for soccer players are typically modest — think local/regional sponsorships and camp income, not the headline football numbers.',
  },
  {
    title: 'The realistic NIL picture for soccer',
    detail:
      'A small number of standout (often national-team or viral) college soccer players land meaningful NIL deals; most earn little to nothing from NIL. Treat any NIL income as a bonus, not the reason to pick a school.',
  },
];
