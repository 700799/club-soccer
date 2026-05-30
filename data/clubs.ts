// ---------------------------------------------------------------------------
// NorCal boys clubs + the AUTHORITATIVE places to read live standings/records.
//
// Important: youth standings change every weekend and league membership is
// re-shuffled every year. Rather than hard-code win/loss numbers that would be
// stale within days (and risk being wrong), we point each league at its
// OFFICIAL live results page and keep a curated, verifiable club directory.
// The `lastReviewed` date tells you when this directory was last checked.
//
// Clubs are real NorCal Premier / competitive member clubs. Where we have a
// verified club URL it is included; otherwise the UI links to the official
// NorCal Premier club directory. `topLevel`/`leagues` reflect the highest tier
// we can verify — many large clubs also field teams in lower tiers. Always
// confirm a team's CURRENT division and record on the official links below.
//
// Sources:
//  - NorCal Premier clubs & standings: https://norcalpremier.com/clubs/ , https://norcalpremier.com/resource/2025-26-schedules-standings/
//  - ECNL / ECRL Boys standings: https://theecnl.com/sports/msoc , https://theecnl.com/sports/ecnl-regional-league-boys
//  - MLS NEXT: https://www.mlssoccer.com/mlsnext/
// ---------------------------------------------------------------------------

export const directoryLastReviewed = '2026-05-30';

export const NORCAL_DIRECTORY_URL = 'https://norcalpremier.com/clubs/';

export interface StandingsSource {
  league: string;
  description: string;
  url: string;
  /** GotSport / provider note so people know where the data lives. */
  provider: string;
}

export const standingsSources: StandingsSource[] = [
  {
    league: 'NorCal Premier (Copper → Premier) & NPL',
    description:
      'Official schedules, results and standings for every NorCal Premier division and the NorCal NPL, by age group and region. Hosted on GotSport.',
    url: 'https://norcalpremier.com/resource/2025-26-schedules-standings/',
    provider: 'NorCal Premier / GotSport',
  },
  {
    league: 'ECNL Regional League (ECRL) Boys — NorCal & Golden State',
    description:
      'Live ECRL Boys standings and results. Choose the NorCal or Golden State conference and your age group.',
    url: 'https://theecnl.com/sports/ecnl-regional-league-boys',
    provider: 'theECNL.com',
  },
  {
    league: 'ECNL Boys — Northern California Conference',
    description:
      'Official ECNL Boys standings, schedules and results by conference and age group.',
    url: 'https://theecnl.com/sports/msoc',
    provider: 'theECNL.com',
  },
  {
    league: 'MLS NEXT',
    description:
      'Official MLS NEXT schedules and standings across the Academy and Elite divisions.',
    url: 'https://www.mlssoccer.com/mlsnext/schedule/',
    provider: 'MLSsoccer.com',
  },
];

export type Region =
  | 'South Bay'
  | 'Peninsula & SF'
  | 'East Bay'
  | 'North Bay'
  | 'Sacramento & Foothills'
  | 'Central Valley'
  | 'Central Coast'
  | 'Far North & Sierra';

export const regions: Region[] = [
  'South Bay',
  'Peninsula & SF',
  'East Bay',
  'North Bay',
  'Sacramento & Foothills',
  'Central Valley',
  'Central Coast',
  'Far North & Sierra',
];

export type Level = 'MLS NEXT' | 'ECNL' | 'ECRL' | 'NPL' | 'NorCal Premier';

export const levelOrder: Level[] = [
  'MLS NEXT',
  'ECNL',
  'ECRL',
  'NPL',
  'NorCal Premier',
];

export interface Club {
  name: string;
  city: string;
  region: Region;
  /** Highest boys level we can verify the club fields. */
  topLevel: Level;
  /** Boys competition tiers the club is associated with. */
  leagues: string[];
  website?: string;
  note?: string;
}

export const clubs: Club[] = [
  // ---------------- South Bay / Silicon Valley ----------------
  {
    name: 'San Jose Earthquakes Academy',
    city: 'San Jose',
    region: 'South Bay',
    topLevel: 'MLS NEXT',
    leagues: ['MLS NEXT'],
    website: 'https://www.sjearthquakes.com/academy',
    note: 'MLS club academy — fully funded for academy players.',
  },
  {
    name: 'De Anza Force',
    city: 'Cupertino',
    region: 'South Bay',
    topLevel: 'MLS NEXT',
    leagues: ['MLS NEXT', 'ECNL', 'ECRL', 'NPL', 'NorCal Premier'],
    website: 'https://www.deanzaforce.org/',
    note: 'Fields teams across every tier — MLS NEXT down to NorCal Premier.',
  },
  {
    name: 'Bay Area Surf',
    city: 'Santa Clara',
    region: 'South Bay',
    topLevel: 'MLS NEXT',
    leagues: ['MLS NEXT', 'NorCal Premier'],
    website: 'https://www.bayareasurf.com/',
    note: 'A leading feeder of players to the San Jose Earthquakes Academy.',
  },
  {
    name: 'MVLA Soccer Club',
    city: 'Mountain View / Los Altos',
    region: 'South Bay',
    topLevel: 'ECNL',
    leagues: ['ECNL', 'ECRL', 'NPL', 'NorCal Premier'],
    website: 'https://www.mvlasc.org/',
    note: 'Founding ECNL Boys NorCal club.',
  },
  {
    name: 'Santa Clara Sporting',
    city: 'Santa Clara',
    region: 'South Bay',
    topLevel: 'ECNL',
    leagues: ['ECNL', 'ECRL', 'NorCal Premier'],
    website: 'https://www.santaclarasporting.com/',
  },
  {
    name: 'Los Gatos United',
    city: 'Los Gatos',
    region: 'South Bay',
    topLevel: 'ECNL',
    leagues: ['ECNL', 'ECRL', 'NorCal Premier'],
    website: 'https://www.lgssc.org/',
    note: 'Promoted from ECRL NorCal into ECNL Boys for 2025-26.',
  },
  {
    name: 'Juventus SC',
    city: 'San Jose',
    region: 'South Bay',
    topLevel: 'NPL',
    leagues: ['NPL', 'NorCal Premier'],
    website: 'https://www.juventussc.com/',
  },
  {
    name: 'Quicksilver SC',
    city: 'San Jose',
    region: 'South Bay',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },
  {
    name: 'Almaden FC',
    city: 'San Jose',
    region: 'South Bay',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
    website: 'https://www.almadenfc.org/',
  },
  {
    name: 'West Valley Youth Soccer',
    city: 'San Jose (West)',
    region: 'South Bay',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
    website: 'https://www.westvalleysoccer.org/',
  },
  {
    name: 'Silicon Valley Soccer Academy',
    city: 'Santa Clara',
    region: 'South Bay',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },
  {
    name: 'Cupertino FC',
    city: 'Cupertino',
    region: 'South Bay',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },

  // ---------------- Peninsula & San Francisco ----------------
  {
    name: 'SF Glens',
    city: 'San Francisco',
    region: 'Peninsula & SF',
    topLevel: 'MLS NEXT',
    leagues: ['MLS NEXT (Academy/Tier 2)', 'NorCal Premier'],
    website: 'https://www.sfglens.com/',
    note: 'Founding member of the MLS NEXT Academy (Tier 2) division.',
  },
  {
    name: 'SF Elite SC',
    city: 'San Francisco',
    region: 'Peninsula & SF',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
    website: 'https://www.sfelitesc.org/',
  },
  {
    name: 'Peninsula Youth Soccer Club',
    city: 'San Mateo / Peninsula',
    region: 'Peninsula & SF',
    topLevel: 'NPL',
    leagues: ['NPL', 'NorCal Premier'],
    website: 'https://www.peninsula-soccer.org/',
    note: 'Fields teams from NPL down to Copper.',
  },
  {
    name: 'JASA (Redwood City)',
    city: 'Redwood City',
    region: 'Peninsula & SF',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },
  {
    name: 'East Palo Alto United SC',
    city: 'East Palo Alto',
    region: 'Peninsula & SF',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },
  {
    name: 'Palo Alto SC',
    city: 'Palo Alto',
    region: 'Peninsula & SF',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },

  // ---------------- East Bay ----------------
  {
    name: 'Mustang SC',
    city: 'Danville',
    region: 'East Bay',
    topLevel: 'ECNL',
    leagues: ['ECNL', 'ECRL', 'NorCal Premier'],
    website: 'https://www.mustangsoccer.com/',
    note: 'Founding ECNL Boys NorCal club.',
  },
  {
    name: 'San Ramon FC',
    city: 'San Ramon',
    region: 'East Bay',
    topLevel: 'ECRL',
    leagues: ['ECRL', 'NorCal Premier'],
    website: 'https://www.sanramonfc.com/',
    note: 'Competes in the ECNL Regional League and NorCal Premier.',
  },
  {
    name: 'Ballistic United SC (BUSC)',
    city: 'Pleasanton',
    region: 'East Bay',
    topLevel: 'NPL',
    leagues: ['NPL', 'NorCal Premier'],
    website: 'https://www.busc.org/',
    note: "Pleasanton's boys club (est. 1968); also runs the Bulldogs Futsal program. Pairs with girls-only Pleasanton RAGE.",
  },
  {
    name: 'Livermore Fusion SC',
    city: 'Livermore',
    region: 'East Bay',
    topLevel: 'ECRL',
    leagues: ['ECRL', 'NPL', 'NorCal Premier'],
    website: 'https://www.fusionsc.org/',
    note: 'Boys & girls; fields ECNL Regional League, NPL and NorCal Premier teams.',
  },
  {
    name: 'Pleasanton RAGE',
    city: 'Pleasanton',
    region: 'East Bay',
    topLevel: 'ECNL',
    leagues: ['ECNL (Girls)', 'NorCal Premier'],
    website: 'https://pleasantonrage.org/',
    note: 'All-girls club — two-time national champion. (Boys in Pleasanton play for BUSC.)',
  },
  {
    name: 'Bay Oaks SC',
    city: 'Oakland',
    region: 'East Bay',
    topLevel: 'NPL',
    leagues: ['NPL', 'NorCal Premier'],
  },
  {
    name: 'Lamorinda SC',
    city: 'Moraga / Lafayette',
    region: 'East Bay',
    topLevel: 'NPL',
    leagues: ['NPL', 'NorCal Premier'],
    website: 'https://www.lamorindasc.org/',
  },
  {
    name: 'Diablo FC',
    city: 'Concord / Walnut Creek',
    region: 'East Bay',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },
  {
    name: 'Walnut Creek SC',
    city: 'Walnut Creek',
    region: 'East Bay',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },
  {
    name: 'Dublin United SC',
    city: 'Dublin',
    region: 'East Bay',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },
  {
    name: 'Fremont Rush SC',
    city: 'Fremont',
    region: 'East Bay',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },

  // ---------------- North Bay ----------------
  {
    name: 'Marin FC',
    city: 'San Rafael / Marin',
    region: 'North Bay',
    topLevel: 'ECNL',
    leagues: ['ECNL', 'ECRL', 'NorCal Premier'],
    website: 'https://marinfc.org/',
    note: 'Founding ECNL Boys NorCal club.',
  },
  {
    name: 'Santa Rosa United',
    city: 'Santa Rosa',
    region: 'North Bay',
    topLevel: 'ECNL',
    leagues: ['ECNL', 'ECRL', 'NorCal Premier'],
    website: 'https://www.santarosaunited.com/',
    note: 'Founding ECNL Boys NorCal club.',
  },
  {
    name: 'North Coast FC',
    city: 'Sonoma County',
    region: 'North Bay',
    topLevel: 'NPL',
    leagues: ['NPL', 'NorCal Premier'],
    website: 'https://northcoastfc.org/',
  },
  {
    name: 'AC Marin',
    city: 'Novato',
    region: 'North Bay',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
    website: 'https://northbayysl.com/',
  },
  {
    name: 'North Marin United',
    city: 'Novato',
    region: 'North Bay',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
    website: 'https://novatosoccer.sportngin.com/',
  },
  {
    name: 'Napa United SC',
    city: 'Napa',
    region: 'North Bay',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },

  // ---------------- Sacramento & Foothills ----------------
  {
    name: 'San Juan Soccer Club',
    city: 'Sacramento',
    region: 'Sacramento & Foothills',
    topLevel: 'ECNL',
    leagues: ['ECNL', 'ECRL', 'NPL', 'NorCal Premier'],
    website: 'https://www.sanjuansc.com/',
    note: 'Founding ECNL Boys NorCal club.',
  },
  {
    name: 'Placer United',
    city: 'Roseville / Placer County',
    region: 'Sacramento & Foothills',
    topLevel: 'ECNL',
    leagues: ['ECNL', 'ECRL', 'NorCal Premier'],
    website: 'https://www.placerunited.com/',
  },
  {
    name: 'Davis Legacy',
    city: 'Davis',
    region: 'Sacramento & Foothills',
    topLevel: 'ECNL',
    leagues: ['ECNL', 'ECRL', 'NorCal Premier'],
    website: 'https://www.davislegacysoccer.org/',
    note: 'Founding ECNL Boys NorCal club.',
  },
  {
    name: 'Sacramento United',
    city: 'Sacramento',
    region: 'Sacramento & Foothills',
    topLevel: 'MLS NEXT',
    leagues: ['MLS NEXT (Academy/Tier 2)', 'NorCal Premier'],
    website: 'https://www.sacunited.com/',
    note: 'Founding member of the MLS NEXT Academy (Tier 2) division.',
  },
  {
    name: 'Sacramento Republic FC Youth',
    city: 'Sacramento',
    region: 'Sacramento & Foothills',
    topLevel: 'NPL',
    leagues: ['NPL', 'NorCal Premier'],
    website: 'https://www.sacrepublicfc.com/academy',
    note: 'Pro-club youth pathway tied to the USL Championship side.',
  },
  {
    name: 'Legends SC',
    city: 'Sacramento',
    region: 'Sacramento & Foothills',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },
  {
    name: 'Natomas United YSL',
    city: 'Sacramento (Natomas)',
    region: 'Sacramento & Foothills',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
    website: 'https://www.natomasysl.org/',
  },
  {
    name: 'West Sacramento SC',
    city: 'West Sacramento',
    region: 'Sacramento & Foothills',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },

  // ---------------- Central Valley ----------------
  {
    name: 'River Islands FC',
    city: 'Lathrop',
    region: 'Central Valley',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },
  {
    name: 'Stockton TLJ FC',
    city: 'Stockton',
    region: 'Central Valley',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },
  {
    name: 'West Coast Soccer Club',
    city: 'Tracy',
    region: 'Central Valley',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },
  {
    name: 'Turlock PSG',
    city: 'Turlock',
    region: 'Central Valley',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },
  {
    name: 'Modesto Ajax',
    city: 'Modesto',
    region: 'Central Valley',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },
  {
    name: 'Madera United FC',
    city: 'Madera',
    region: 'Central Valley',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },

  // ---------------- Central Coast ----------------
  {
    name: 'Santa Cruz United FC (Breakers)',
    city: 'Santa Cruz',
    region: 'Central Coast',
    topLevel: 'NPL',
    leagues: ['NPL', 'NorCal Premier'],
    website: 'https://www.scunited.org/',
    note: 'NorCal Premier & NPL member club for Santa Cruz County / Central Coast.',
  },
  {
    name: 'Monterey Condors Club',
    city: 'Monterey',
    region: 'Central Coast',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },
  {
    name: 'Hollister Tremors YSL',
    city: 'Hollister',
    region: 'Central Coast',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },

  // ---------------- Far North & Sierra ----------------
  {
    name: 'Sierra United SC',
    city: 'Grass Valley / Sierra Foothills',
    region: 'Far North & Sierra',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },
  {
    name: 'North Valley YSL',
    city: 'Chico / North Valley',
    region: 'Far North & Sierra',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },
  {
    name: 'Northern Nevada SC',
    city: 'Reno, NV (NorCal play)',
    region: 'Far North & Sierra',
    topLevel: 'NorCal Premier',
    leagues: ['NorCal Premier'],
  },
];
