// ---------------------------------------------------------------------------
// The NorCal boys' soccer pyramid, lowest rung to highest.
//
// Sources (verified May 2026):
//  - NorCal Premier league overview & divisions: https://norcalpremier.com/resource/league-overview-14-19/
//  - ECNL Regional League / NorCal re-alignment: https://theecnl.com/news/2025/2/27/ecnl-regional-league-expands-and-re-aligns-with-norcal-premier-soccer-for-2025-26-season.aspx
//  - Cost ranges: https://onebeatsoccer.com/youth-soccer-costs/ , https://playclubsoccer.org/blog/club-soccer-financial-considerations-the-cost-of-youth-soccer
//
// Costs are ANNUAL and split into "club dues" (what you pay the club) and
// "all-in" (dues + tournaments + travel + gear). Figures are realistic 2025-26
// ranges and will vary by club, age group and how much you travel.
// ---------------------------------------------------------------------------

export interface CostBand {
  duesLow: number;
  duesHigh: number;
  allInLow: number;
  allInHigh: number;
  note: string;
}

export interface LeagueLevel {
  id: string;
  rung: number; // 1 = base of the pyramid
  name: string;
  shortName: string;
  tagline: string;
  governingBody: string;
  ageRange: string;
  travel: string;
  selectivity: string;
  description: string;
  expectations: string[];
  whoItsFor: string;
  cost: CostBand;
  /** Hex used in the pyramid graphic. */
  color: string;
  officialUrl?: string;
  standingsUrl?: string;
  standingsLabel?: string;
}

export const leagues: LeagueLevel[] = [
  {
    id: 'rec',
    rung: 1,
    name: 'Recreational',
    shortName: 'Rec',
    tagline: 'Where almost every player starts.',
    governingBody: 'AYSO / city & parks leagues / USYS rec',
    ageRange: 'U4 – U19',
    travel: 'Same town. Games are usually one field complex.',
    selectivity: 'Open to all. No tryouts — everybody plays.',
    description:
      'Recreational soccer is the front door to the sport. Teams are formed to be balanced (not to win), every child gets guaranteed playing time, and the emphasis is fun, fitness and fundamentals. AYSO\'s "Everyone Plays" model is the classic example. It is the right starting point for almost every young player regardless of long-term ambition.',
    expectations: [
      '1 practice + 1 game per week, roughly an 8–12 week season.',
      'Volunteer parent coaches; mixed ability on every roster.',
      'Equal playing time is a rule, not a courtesy.',
      'Skill-building and a love of the game matter more than the score.',
    ],
    whoItsFor:
      'New players, young players (U4–U10), and anyone who wants to play for fun without a big time or money commitment.',
    cost: {
      duesLow: 60,
      duesHigh: 300,
      allInLow: 100,
      allInHigh: 500,
      note: 'Per season. Usually includes a uniform and referee fees. Almost no travel cost.',
    },
    color: '#94a3b8',
  },
  {
    id: 'select',
    rung: 2,
    name: 'Select / Competitive (Club Entry)',
    shortName: 'Select',
    tagline: 'The first tryout-based, year-round step.',
    governingBody: 'Local clubs competing in NorCal Premier',
    ageRange: 'U8 – U19',
    travel: 'Mostly within your region of Northern California.',
    selectivity: 'Tryouts. Rosters are picked; not everyone makes a team.',
    description:
      '"Select" (also called "competitive," "travel," or "club") is the jump from rec into a year-round club environment. Players try out, train 2–3 times a week with licensed coaches, and play a structured league season — in Northern California that league is almost always NorCal Premier. Select teams are placed into NorCal Premier divisions (Copper through Premier) based on their level.',
    expectations: [
      '2–3 training sessions + 1 league game per week, fall and spring seasons.',
      'A real tryout each year and a roster commitment.',
      'Playing time is earned, not guaranteed.',
      'Club registration, uniform kit and tournament entries.',
    ],
    whoItsFor:
      'Players ready to commit to year-round development and who want to be challenged beyond the rec level.',
    cost: {
      duesLow: 1000,
      duesHigh: 2200,
      allInLow: 1300,
      allInHigh: 3500,
      note: 'Annual. Lower NorCal Premier divisions (Copper/Bronze) sit at the bottom of this range.',
    },
    color: '#22c55e',
    officialUrl: 'https://norcalpremier.com/',
  },
  {
    id: 'norcal-premier',
    rung: 3,
    name: 'NorCal Premier League',
    shortName: 'NorCal Premier',
    tagline: 'The 3,000-team regional ladder: Copper → Bronze → Silver → Gold → Premier.',
    governingBody: 'NorCal Premier Soccer (US Club Soccer)',
    ageRange: 'U8 – U19',
    travel: 'Regionalized to limit driving — usually within your area of NorCal.',
    selectivity: 'Club teams are seeded into divisions by ability and past results.',
    description:
      'NorCal Premier is the backbone of competitive youth soccer in Northern California — over 3,000 teams across U8–U19. Teams are slotted into tiered divisions and regionalized to keep travel sane. The divisions, from entry-competitive up to the top of the regional pyramid, are Copper, Bronze, Silver, Gold and Premier. Teams are promoted and relegated season to season based on results, so a club often fields several teams across different divisions at the same age.',
    expectations: [
      'Promotion/relegation between divisions based on your win/loss record.',
      'Lower divisions (Copper/Bronze) emphasize development; Gold/Premier are genuinely competitive.',
      'Regionalized scheduling keeps most games inside Northern California.',
      'A clear, transparent path to move up as a team improves.',
    ],
    whoItsFor:
      'Every committed club player. This is the league where the vast majority of NorCal youth soccer is actually played.',
    cost: {
      duesLow: 1500,
      duesHigh: 3500,
      allInLow: 2000,
      allInHigh: 6000,
      note: 'Annual, climbing with the division. Gold/Premier sides add more tournaments and a bit more travel.',
    },
    color: '#16a34a',
    officialUrl: 'https://norcalpremier.com/',
    standingsUrl: 'https://norcalpremier.com/resource/2025-26-schedules-standings/',
    standingsLabel: 'NorCal Premier 2025-26 Schedules & Standings',
  },
  {
    id: 'npl',
    rung: 4,
    name: 'National Premier Leagues (NPL)',
    shortName: 'NPL',
    tagline: 'The top of the NorCal regional pyramid, with a national postseason.',
    governingBody: 'US Club Soccer — NorCal NPL',
    ageRange: 'U13 – U19',
    travel: 'NorCal league play plus the chance to travel to NPL Finals.',
    selectivity: 'Sits above the NorCal Premier divisions; strong club teams.',
    description:
      'The National Premier Leagues sit a rung above the standard NorCal Premier divisions. NorCal runs its own NPL, and it plugs into a national structure: top NPL teams advance to the NPL Finals and national competition. In the boys\' game the NorCal NPL is also a feeder to ECNL — the 1st-place NorCal NPL team earns a promotion playoff against the bottom ECNL NorCal club for a spot in the conference the next year.',
    expectations: [
      'A higher, more consistent standard of week-to-week competition.',
      'A genuine national pathway via NPL Finals.',
      'A promotion route into ECNL for the top boys\' team.',
      'More tournaments and showcases than standard NorCal Premier.',
    ],
    whoItsFor:
      'Strong club teams that want elevated competition and a national postseason without full ECNL/MLS NEXT travel and cost.',
    cost: {
      duesLow: 1500,
      duesHigh: 3000,
      allInLow: 3000,
      allInHigh: 7000,
      note: 'Annual. Add travel if your team qualifies for regional/national NPL events.',
    },
    color: '#0ea5e9',
    officialUrl: 'https://usclubsoccer.org/norcal-premier-npl/',
    standingsUrl: 'https://norcalpremier.com/resource/2025-26-schedules-standings/',
    standingsLabel: 'NorCal Premier / NPL Standings',
  },
  {
    id: 'ecrl',
    rung: 5,
    name: 'ECNL Regional League (ECRL)',
    shortName: 'ECRL',
    tagline: 'The proving ground below ECNL — NorCal & Golden State divisions.',
    governingBody: 'Elite Clubs National League, aligned with NorCal Premier',
    ageRange: 'U13 – U18',
    travel: 'Mostly California; less than full ECNL, more than NorCal Premier.',
    selectivity: 'Clubs qualify out of NorCal Premier; ~20 teams per age group.',
    description:
      'The ECNL Regional League (ECRL, sometimes "ECNL RL") is the official feeder tier directly beneath ECNL. For 2025-26 it was re-aligned with NorCal Premier into two California divisions: ECRL NorCal, made up of roughly 20 teams per age group (U13–U18) from clubs that qualify out of NorCal Premier; and ECRL Golden State, which is largely the second teams of full-ECNL clubs, keeping deeper player pools on an ECNL-style schedule. Top ECRL NorCal clubs are considered for promotion into ECNL.',
    expectations: [
      'ECNL-style competition and college-showcase exposure with a lighter travel load.',
      'A clear promotion pathway: top ECRL NorCal clubs can move up to ECNL.',
      'Golden State acts as a true reserve league for ECNL clubs\' second teams.',
      'A real step up in coaching, standards and scouting from NorCal Premier.',
    ],
    whoItsFor:
      'Players and clubs aspiring to ECNL who want elite competition without the full national-travel commitment yet.',
    cost: {
      duesLow: 1950,
      duesHigh: 3500,
      allInLow: 4000,
      allInHigh: 8000,
      note: 'Annual. California-centric travel keeps it below full ECNL, but above NorCal Premier.',
    },
    color: '#6366f1',
    officialUrl: 'https://theecnl.com/sports/ecnl-regional-league-boys',
    standingsUrl: 'https://theecnl.com/sports/ecnl-regional-league-boys',
    standingsLabel: 'ECNL Regional League Boys — Standings',
  },
  {
    id: 'ecnl',
    rung: 6,
    name: 'ECNL (Elite Clubs National League)',
    shortName: 'ECNL',
    tagline: 'The premier college-recruiting platform for club soccer.',
    governingBody: 'Elite Clubs National League — Northern California Conference',
    ageRange: 'U13 – U19',
    travel: 'National showcases — expect flights and multi-day trips.',
    selectivity: 'Invitation/membership only. Among the most selective tiers.',
    description:
      'ECNL (boys launched in 2017) is widely regarded as the top club platform for college recruiting in the country, and its National Events are the premier college-showcase weekends. The Boys Northern California Conference launched in 2020-21; founding clubs included Davis Legacy, Marin FC, MVLA, Mustang, San Juan SC and Santa Rosa United, with De Anza Force, Placer United, Santa Clara Sporting and Los Gatos United among those competing more recently. It runs promotion/relegation with the NorCal NPL.',
    expectations: [
      'A near-professional weekly standard and year-round commitment.',
      'National showcase events where college coaches recruit in volume.',
      'Travel and cost step up sharply versus regional leagues.',
      'Strong college-placement support and exposure.',
    ],
    whoItsFor:
      'Elite players targeting college soccer who can commit the time, travel and budget.',
    cost: {
      duesLow: 2000,
      duesHigh: 3500,
      allInLow: 8000,
      allInHigh: 15000,
      note: 'Annual ALL-IN. Club dues are a fraction; national-event flights, hotels and meals drive the total.',
    },
    color: '#a855f7',
    officialUrl: 'https://theecnl.com/sports/msoc',
    standingsUrl: 'https://theecnl.com/sports/msoc',
    standingsLabel: 'ECNL Boys — Standings',
  },
  {
    id: 'mls-next',
    rung: 7,
    name: 'MLS NEXT',
    shortName: 'MLS NEXT',
    tagline: 'The elite boys pathway, run by Major League Soccer.',
    governingBody: 'Major League Soccer',
    ageRange: 'U13 – U19 (moving to school-year ages in 2026-27)',
    travel: 'National. Among the heaviest travel commitments in youth soccer.',
    selectivity: 'The most selective boys tier. MLS academies + top non-MLS clubs.',
    description:
      'MLS NEXT is the premier boys\' youth platform in North America, run by Major League Soccer for top players U13–U19. It is where MLS club academies (in NorCal, the San Jose Earthquakes Academy) play alongside elite independent clubs such as De Anza Force, Bay Area Surf and SF Glens. For 2025-26 MLS NEXT added an Academy (Tier 2) division — SF Glens and Sacramento United are NorCal members — and the league is expanding again for 2026-27 with a move to school-year age groups.',
    expectations: [
      'The highest level of boys youth competition and scouting in the U.S.',
      'A direct line of sight to MLS NEXT Pro and professional academies.',
      'Heavy national travel and a near-full-time commitment.',
      'MLS-run academies (e.g., SJ Earthquakes) are fully funded — free to the player.',
    ],
    whoItsFor:
      'The top boys aiming at a professional pathway or top-tier college soccer.',
    cost: {
      duesLow: 0,
      duesHigh: 3500,
      allInLow: 0,
      allInHigh: 14000,
      note: 'MLS-academy players (e.g., San Jose Earthquakes) typically pay $0. Independent MLS NEXT clubs run $8k–$14k all-in with national travel.',
    },
    color: '#ef4444',
    officialUrl: 'https://www.mlssoccer.com/mlsnext/',
    standingsUrl: 'https://www.mlssoccer.com/mlsnext/schedule/',
    standingsLabel: 'MLS NEXT — Schedule & Standings',
  },
  {
    id: 'beyond',
    rung: 8,
    name: 'Pro Pathway — MLS NEXT Pro & Beyond',
    shortName: 'Pro',
    tagline: 'Where the very best graduate: academy → pro.',
    governingBody: 'MLS / MLS NEXT Pro / USL',
    ageRange: 'U17+',
    travel: 'Professional environment.',
    selectivity: 'A tiny fraction of players. Homegrown & pro contracts.',
    description:
      'Above MLS NEXT sits the professional pathway: MLS NEXT Pro (the league\'s pro/reserve tier), homegrown signings to MLS first teams, USL clubs, and moves abroad. Only a very small fraction of youth players reach this level, but it is the apex the entire pyramid points toward. Each spring, MLS and MLS NEXT Pro signings clarify which top prospects turn pro versus going the college route.',
    expectations: [
      'A professional training and competition environment.',
      'Contracts, homegrown rights and, for some, international moves.',
      'Reached by a tiny percentage of youth players.',
    ],
    whoItsFor:
      'Elite graduates of academy soccer pursuing the professional game.',
    cost: {
      duesLow: 0,
      duesHigh: 0,
      allInLow: 0,
      allInHigh: 0,
      note: 'Players are paid, not charged. This is professional soccer.',
    },
    color: '#b91c1c',
    officialUrl: 'https://www.mlssoccer.com/mlsnextpro/',
  },
];

// The five NorCal Premier divisions, entry-competitive (Copper) to top (Premier).
export interface NorCalDivision {
  name: string;
  level: string;
  blurb: string;
  color: string;
}

export const norcalPremierDivisions: NorCalDivision[] = [
  {
    name: 'Copper',
    level: 'Entry competitive',
    blurb:
      'The introductory NorCal Premier division. First-year competitive teams and developing players find their feet here.',
    color: '#b45309',
  },
  {
    name: 'Bronze',
    level: 'Developing',
    blurb:
      'A step up from Copper. Teams that have begun winning consistently move up to face tougher opponents.',
    color: '#a16207',
  },
  {
    name: 'Silver',
    level: 'Solid competitive',
    blurb:
      'The broad middle of the pyramid. Genuinely competitive soccer with promotion and relegation in play.',
    color: '#64748b',
  },
  {
    name: 'Gold',
    level: 'Strong competitive',
    blurb:
      'High-level regional soccer. Gold sides are among the better teams at their age and often chase NPL/ECRL.',
    color: '#ca8a04',
  },
  {
    name: 'Premier',
    level: 'Top of the regional pyramid',
    blurb:
      'The strongest NorCal Premier division (top tier for U11–U13). The springboard to NPL, ECRL and ECNL.',
    color: '#15803d',
  },
];
