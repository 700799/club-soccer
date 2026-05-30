// ---------------------------------------------------------------------------
// The girls' NorCal pathway. The lower rungs (Rec → Select → NorCal Premier
// Copper→Premier → NPL → ECNL RL) mirror the boys' ladder, so this section
// focuses on what's DIFFERENT for girls: the top tier, the GA/DPL ecosystem,
// and the pro route.
//
// Sources (verified May 2026):
//  - ECNL Girls NorCal Conference launch & clubs:
//    https://www.soccerwire.com/news/ecnl-girls-launches-northern-cal-conference-for-2022-23-featuring-10-clubs/
//  - Girls Academy + ASPIRE + DPL ecosystem:
//    https://girlsacademyleague.com/ , https://dpleague.org/ ,
//    https://www.soccerwire.com/news/girls-academy-integrates-dpl-as-official-second-tier-of-gas-competitive-structure/
//  - ECRL Girls NorCal 2025-26 member clubs:
//    https://norcalpremier.com/norcal-premier-soccer-announces-25-clubs-selected-for-realigned-ecnl-regional-league-for-the-2025-26-season/
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
    title: 'The GA ecosystem: GA → ASPIRE → DPL → DPL Open',
    detail:
      'Girls Academy (GA, founded 2020) sits atop a four-tier, merit-based pathway. ASPIRE — launched in 2025 and run by the DPL — is GA\'s official 2nd tier, with the DPL and DPL Open below it. Clubs and players can earn their way up.',
  },
  {
    title: 'DPL — the Development Player League',
    detail:
      'A nationally recognized, standards-driven girls league that now serves as the competitive base of the Girls Academy structure. Several NorCal clubs (e.g., Dublin United) field DPL pathway teams.',
  },
  {
    title: 'The regional feeders mirror the boys',
    detail:
      'Below the top sit ECNL Regional League (ECRL) Girls — NorCal, GA Aspire/DPL, NPL and the NorCal Premier divisions (Copper → Premier) — the same ladder the boys climb.',
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
      'The other national #1, founded in 2020. Tops a four-tier pathway — GA → ASPIRE → DPL → DPL Open — that rewards performance-based promotion.',
    url: 'https://girlsacademyleague.com/',
    color: '#ec4899',
  },
  {
    name: 'DPL / ASPIRE (Development Player League)',
    tier: 'GA 2nd–3rd tier',
    blurb:
      'ASPIRE (launched 2025) is GA\'s official second tier, operated by the DPL; the DPL and DPL Open sit just below. A standards-driven, college-exposure pathway up to GA.',
    url: 'https://dpleague.org/',
    color: '#f59e0b',
  },
  {
    name: 'ECNL Regional League (ECRL) Girls — NorCal',
    tier: 'Regional feeder',
    blurb:
      'The proving ground below ECNL Girls, aligned with NorCal Premier. Re-aligned and expanded for 2025-26; top clubs are considered for promotion to ECNL.',
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
    league: 'Girls Academy (GA), ASPIRE & DPL',
    description:
      'Girls Academy standings and members across GA and ASPIRE; DPL/DPL Open tables on the DPL site.',
    url: 'https://girlsacademyleague.com/',
    provider: 'girlsacademyleague.com / dpleague.org',
  },
  {
    league: 'NorCal Premier (Girls) & NPL',
    description:
      'The same GotSport-hosted NorCal Premier standings cover girls divisions (Copper → Premier) and NPL by age group and region.',
    url: 'https://norcalpremier.com/resource/2025-26-schedules-standings/',
    provider: 'NorCal Premier / GotSport',
  },
];

export type GirlsLeagueTag = 'ECNL Girls' | 'Girls Academy' | 'DPL' | 'ECRL Girls';

export interface GirlsClub {
  name: string;
  league: GirlsLeagueTag;
}

// Verified NorCal girls clubs by their top girls platform. Many also field
// teams in NPL and the NorCal Premier divisions. (ECRL Girls NorCal list =
// 2025-26 realigned member clubs.)
export const girlsClubs: GirlsClub[] = [
  // ECNL Girls — Northern California Conference
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
  // Girls Academy (GA) / ASPIRE
  { name: 'Sacramento United', league: 'Girls Academy' },
  { name: 'FC Bay Area Surf', league: 'Girls Academy' },
  // DPL (Development Player League) pathway
  { name: 'Dublin United (DUFC)', league: 'DPL' },
  // ECNL Regional League (ECRL) Girls — NorCal (2025-26 member clubs)
  { name: 'San Ramon FC (SRFC)', league: 'ECRL Girls' },
  { name: 'Santa Clara Sporting', league: 'ECRL Girls' },
  { name: 'Los Gatos United', league: 'ECRL Girls' },
  { name: 'San Francisco Elite Academy', league: 'ECRL Girls' },
  { name: 'SF United', league: 'ECRL Girls' },
  { name: 'Stanford Strikers FC', league: 'ECRL Girls' },
  { name: 'Walnut Creek Surf SC', league: 'ECRL Girls' },
  { name: 'Diablo Valley FC', league: 'ECRL Girls' },
  { name: 'Eastshore Alliance FC', league: 'ECRL Girls' },
  { name: 'Folsom Lake Surf', league: 'ECRL Girls' },
  { name: 'Livermore Fusion FC', league: 'ECRL Girls' },
  { name: 'Revolution FC', league: 'ECRL Girls' },
  { name: 'Solano Surf', league: 'ECRL Girls' },
  { name: 'North Coast FC', league: 'ECRL Girls' },
  { name: 'West Coast Soccer', league: 'ECRL Girls' },
  { name: 'Napa United', league: 'ECRL Girls' },
  { name: 'Burlingame SC', league: 'ECRL Girls' },
  { name: 'California Magic SC', league: 'ECRL Girls' },
  { name: 'Association FC', league: 'ECRL Girls' },
  { name: 'Stanislaus United', league: 'ECRL Girls' },
  { name: 'Valley Surf', league: 'ECRL Girls' },
];
