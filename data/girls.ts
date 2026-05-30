// ---------------------------------------------------------------------------
// The girls' NorCal pathway. The lower rungs (Rec → Select → NorCal Premier
// Copper→Premier → NPL → ECNL RL) mirror the boys' ladder, so this section
// focuses on what's DIFFERENT for girls: the top tier and the pro route.
//
// Sources (verified May 2026):
//  - ECNL Girls NorCal Conference launch & clubs:
//    https://www.soccerwire.com/news/ecnl-girls-launches-northern-cal-conference-for-2022-23-featuring-10-clubs/
//  - Girls Academy (GA) + Aspire: https://girlsacademyleague.com/ ,
//    https://ussoccerparent.com/girls-academy-vs-aspire-vs-ecnl-2025-26-guide/
//  - ECNL Girls standings: https://theecnl.com/sports/wsoc
// ---------------------------------------------------------------------------

export interface GirlsDifference {
  title: string;
  detail: string;
}

export const girlsDifferences: GirlsDifference[] = [
  {
    title: 'No MLS NEXT — two #1 leagues instead',
    detail:
      'MLS NEXT is boys-only. On the girls side the top is split between two competing national leagues: ECNL Girls and the Girls Academy (GA). Both are elite college-recruiting platforms.',
  },
  {
    title: 'ECNL Girls is the long-running platform',
    detail:
      'ECNL Girls (the original ECNL, since 2009) launched a Northern Cal Conference in 2022-23. Over 90% of ECNL girls go on to play college soccer.',
  },
  {
    title: 'Girls Academy (GA) is the other major league',
    detail:
      'GA was founded in 2020 after the U.S. Soccer Development Academy folded. Its second tier, GA Aspire (launched 2025), is a feeder to the top GA platform.',
  },
  {
    title: 'The regional feeders mirror the boys',
    detail:
      'Below the top sit ECNL Regional League (ECRL) Girls — NorCal, GA Aspire, NPL and the NorCal Premier divisions (Copper → Premier) — the same ladder the boys climb.',
  },
  {
    title: 'The pro route runs through college',
    detail:
      'Unlike the boys, almost no girls turn pro straight from high school. The path is youth → college → pro (NWSL — the Bay Area\'s Bay FC — or the USL Super League).',
  },
  {
    title: 'Injury prevention matters even more',
    detail:
      'Girls are 4–6× more likely to tear an ACL than boys. The prevention program and footwear guidance in the Injuries section are especially important for girls.',
  },
];

export interface GirlsLeague {
  name: string;
  tier: string;
  blurb: string;
  url: string;
  color: string;
}

export const girlsTopLeagues: GirlsLeague[] = [
  {
    name: 'ECNL Girls',
    tier: 'Top tier',
    blurb:
      'The longest-running national girls platform and a college-recruiting powerhouse. NorCal Conference launched 2022-23; California Odyssey was promoted in for 2025-26.',
    url: 'https://theecnl.com/sports/wsoc',
    color: '#a855f7',
  },
  {
    name: 'Girls Academy (GA)',
    tier: 'Top tier',
    blurb:
      'The other national #1, founded in 2020. Performance-based, with GA Aspire as its second-tier feeder. Several NorCal clubs field GA teams.',
    url: 'https://girlsacademyleague.com/',
    color: '#ec4899',
  },
  {
    name: 'ECNL Regional League (ECRL) Girls — NorCal',
    tier: 'Regional feeder',
    blurb:
      'The proving ground below ECNL Girls, aligned with NorCal Premier. Top clubs are considered for promotion to ECNL.',
    url: 'https://theecnl.com/sports/ecnl-regional-league-girls',
    color: '#6366f1',
  },
];

export interface GirlsStandingsSource {
  league: string;
  description: string;
  url: string;
  provider: string;
}

export const girlsStandingsSources: GirlsStandingsSource[] = [
  {
    league: 'ECNL Girls — Northern California Conference',
    description:
      'Official ECNL Girls standings, schedules and results by conference and age group.',
    url: 'https://theecnl.com/sports/wsoc',
    provider: 'theECNL.com',
  },
  {
    league: 'ECNL Regional League (ECRL) Girls — NorCal',
    description: 'Live ECRL Girls standings; pick the NorCal conference and age group.',
    url: 'https://theecnl.com/sports/ecnl-regional-league-girls',
    provider: 'theECNL.com',
  },
  {
    league: 'Girls Academy (GA) & GA Aspire',
    description:
      'Girls Academy league standings, members and results across GA and the Aspire tier.',
    url: 'https://girlsacademyleague.com/',
    provider: 'girlsacademyleague.com',
  },
  {
    league: 'NorCal Premier (Girls) & NPL',
    description:
      'The same GotSport-hosted NorCal Premier standings cover girls divisions (Copper → Premier) and NPL by age group and region.',
    url: 'https://norcalpremier.com/resource/2025-26-schedules-standings/',
    provider: 'NorCal Premier / GotSport',
  },
];

export interface GirlsClub {
  name: string;
  league: 'ECNL Girls' | 'Girls Academy' | 'ECRL Girls';
}

// Verified NorCal girls clubs by their top girls platform. Many also field
// teams in NPL and the NorCal Premier divisions.
export const girlsClubs: GirlsClub[] = [
  { name: 'MVLA', league: 'ECNL Girls' },
  { name: 'Mustang SC', league: 'ECNL Girls' },
  { name: 'San Juan SC', league: 'ECNL Girls' },
  { name: 'Davis Legacy', league: 'ECNL Girls' },
  { name: 'Marin FC', league: 'ECNL Girls' },
  { name: 'De Anza Force', league: 'ECNL Girls' },
  { name: 'Santa Rosa United', league: 'ECNL Girls' },
  { name: 'Pleasanton RAGE', league: 'ECNL Girls' },
  { name: 'Bay Area Surf', league: 'ECNL Girls' },
  { name: 'Placer United', league: 'ECNL Girls' },
  { name: 'California Odyssey', league: 'ECNL Girls' },
  { name: 'Sacramento United', league: 'Girls Academy' },
  { name: 'FC Bay Area Surf', league: 'Girls Academy' },
  { name: 'San Francisco Elite Academy', league: 'ECRL Girls' },
  { name: 'Los Gatos United', league: 'ECRL Girls' },
  { name: 'West Coast SC', league: 'ECRL Girls' },
  { name: 'Napa United', league: 'ECRL Girls' },
];
