import type { Region } from './clubs';

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

// Gender-aware directory rows for the filterable club directory's GIRLS toggle.
// `level` is the club's top GIRLS platform; `region` is by city. Regions are
// confident from club locations; a couple of newer clubs are best-effort — as
// always, confirm current league/region on the official links.
export type GirlsDirLevel =
  | 'ECNL Girls'
  | 'Girls Academy'
  | 'DPL'
  | 'ECRL Girls'
  | 'NPL'
  | 'NorCal Premier';

export interface GirlsDirClub {
  name: string;
  city: string;
  region: Region;
  level: GirlsDirLevel;
  website?: string;
}

export const girlsDirLevelOrder: GirlsDirLevel[] = [
  'ECNL Girls',
  'Girls Academy',
  'DPL',
  'ECRL Girls',
  'NPL',
  'NorCal Premier',
];

export const girlsDirectoryClubs: GirlsDirClub[] = [
  // ECNL Girls — Northern California Conference
  { name: 'MVLA', city: 'Mountain View / Los Altos', region: 'South Bay', level: 'ECNL Girls', website: 'https://www.mvlasc.org/' },
  { name: 'De Anza Force', city: 'Cupertino', region: 'South Bay', level: 'ECNL Girls', website: 'https://www.deanzaforce.org/' },
  { name: 'Bay Area Surf', city: 'Santa Clara', region: 'South Bay', level: 'ECNL Girls', website: 'https://www.bayareasurf.com/' },
  { name: 'Mustang SC', city: 'Danville', region: 'East Bay', level: 'ECNL Girls', website: 'https://www.mustangsoccer.com/' },
  { name: 'Pleasanton RAGE', city: 'Pleasanton', region: 'East Bay', level: 'ECNL Girls', website: 'https://www.pleasantonrage.org/' },
  { name: 'Marin FC', city: 'San Rafael / Marin', region: 'North Bay', level: 'ECNL Girls', website: 'https://marinfc.org/' },
  { name: 'Santa Rosa United', city: 'Santa Rosa', region: 'North Bay', level: 'ECNL Girls', website: 'https://www.santarosaunited.com/' },
  { name: 'San Juan SC', city: 'Sacramento', region: 'Sacramento & Foothills', level: 'ECNL Girls', website: 'https://www.sanjuansc.com/' },
  { name: 'Davis Legacy', city: 'Davis', region: 'Sacramento & Foothills', level: 'ECNL Girls', website: 'https://www.davislegacysoccer.org/' },
  { name: 'Placer United', city: 'Roseville / Placer County', region: 'Sacramento & Foothills', level: 'ECNL Girls', website: 'https://www.placerunited.com/' },
  { name: 'California Odyssey', city: 'Fresno / Clovis', region: 'Central Valley', level: 'ECNL Girls' },

  // Girls Academy (GA) / ASPIRE
  { name: 'Sacramento United', city: 'Sacramento', region: 'Sacramento & Foothills', level: 'Girls Academy', website: 'https://www.sacunited.com/' },
  { name: 'FC Bay Area Surf', city: 'Santa Clara / Bay Area', region: 'South Bay', level: 'Girls Academy', website: 'https://www.bayareasurf.org/' },

  // DPL (Development Player League) pathway
  { name: 'Dublin United (DUFC)', city: 'Dublin', region: 'East Bay', level: 'DPL', website: 'https://www.dublinsoccer.org/' },

  // ECNL Regional League (ECRL) Girls — NorCal (2025-26 member clubs)
  { name: 'Santa Clara Sporting', city: 'Santa Clara', region: 'South Bay', level: 'ECRL Girls', website: 'https://www.santaclarasporting.com/' },
  { name: 'Los Gatos United', city: 'Los Gatos', region: 'South Bay', level: 'ECRL Girls', website: 'https://www.lgssc.org/' },
  { name: 'San Ramon FC (SRFC)', city: 'San Ramon', region: 'East Bay', level: 'ECRL Girls', website: 'https://www.sanramonfc.com/' },
  { name: 'Walnut Creek Surf SC', city: 'Walnut Creek', region: 'East Bay', level: 'ECRL Girls' },
  { name: 'Diablo Valley FC', city: 'Concord / Walnut Creek', region: 'East Bay', level: 'ECRL Girls' },
  { name: 'Eastshore Alliance FC', city: 'Berkeley / El Cerrito', region: 'East Bay', level: 'ECRL Girls' },
  { name: 'Livermore Fusion FC', city: 'Livermore', region: 'East Bay', level: 'ECRL Girls' },
  { name: 'California Magic SC', city: 'Concord', region: 'East Bay', level: 'ECRL Girls', website: 'https://www.camagicsc.com/' },
  { name: 'San Francisco Elite Academy', city: 'San Francisco', region: 'Peninsula & SF', level: 'ECRL Girls' },
  { name: 'SF United', city: 'San Francisco', region: 'Peninsula & SF', level: 'ECRL Girls' },
  { name: 'Stanford Strikers FC', city: 'Palo Alto', region: 'Peninsula & SF', level: 'ECRL Girls' },
  { name: 'Burlingame SC', city: 'Burlingame', region: 'Peninsula & SF', level: 'ECRL Girls' },
  { name: 'Folsom Lake Surf', city: 'Folsom', region: 'Sacramento & Foothills', level: 'ECRL Girls' },
  { name: 'Revolution FC', city: 'Sacramento area', region: 'Sacramento & Foothills', level: 'ECRL Girls', website: 'https://www.revolutionfc.org/' },
  { name: 'Association FC', city: 'Sacramento area', region: 'Sacramento & Foothills', level: 'ECRL Girls' },
  { name: 'Solano Surf', city: 'Solano County', region: 'North Bay', level: 'ECRL Girls' },
  { name: 'North Coast FC', city: 'Sonoma County', region: 'North Bay', level: 'ECRL Girls', website: 'https://northcoastfc.org/' },
  { name: 'Napa United', city: 'Napa', region: 'North Bay', level: 'ECRL Girls' },
  { name: 'West Coast Soccer', city: 'Tracy', region: 'Central Valley', level: 'ECRL Girls' },
  { name: 'Stanislaus United', city: 'Modesto / Turlock', region: 'Central Valley', level: 'ECRL Girls' },
  { name: 'Valley Surf', city: 'Central Valley', region: 'Central Valley', level: 'ECRL Girls' },
];
