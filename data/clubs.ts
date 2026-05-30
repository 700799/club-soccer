// ---------------------------------------------------------------------------
// NorCal boys clubs + the AUTHORITATIVE places to read live standings/records.
//
// Important: youth standings change every weekend and league membership is
// re-shuffled every year. Rather than hard-code win/loss numbers that would be
// stale within days (and risk being wrong), we point each league at its
// OFFICIAL live results page and keep a curated, verifiable club directory.
// The `lastReviewed` date tells you when this directory was last checked.
//
// Sources:
//  - NorCal Premier clubs & standings: https://norcalpremier.com/clubs/ , https://norcalpremier.com/resource/2025-26-schedules-standings/
//  - ECNL / ECRL Boys standings: https://theecnl.com/sports/msoc , https://theecnl.com/sports/ecnl-regional-league-boys
//  - MLS NEXT: https://www.mlssoccer.com/mlsnext/
// ---------------------------------------------------------------------------

export const directoryLastReviewed = '2026-05-30';

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

export interface Club {
  name: string;
  city: string;
  /** Highest boys level the club fields, for sorting/badging. */
  topLevel: 'MLS NEXT' | 'ECNL' | 'ECRL' | 'NPL' | 'NorCal Premier';
  /** All boys competition tiers the club is associated with. */
  leagues: string[];
  website: string;
  note?: string;
}

// A representative directory of NorCal boys clubs. Verify current rosters and
// league placement on each club's site and the official standings links above.
export const clubs: Club[] = [
  {
    name: 'San Jose Earthquakes Academy',
    city: 'San Jose',
    topLevel: 'MLS NEXT',
    leagues: ['MLS NEXT'],
    website: 'https://www.sjearthquakes.com/academy',
    note: 'MLS club academy — fully funded for academy players.',
  },
  {
    name: 'De Anza Force',
    city: 'Cupertino',
    topLevel: 'MLS NEXT',
    leagues: ['MLS NEXT', 'ECNL', 'ECRL', 'NPL', 'NorCal Premier'],
    website: 'https://www.deanzaforce.org/',
    note: 'Fields teams across every tier — MLS NEXT down to NorCal Premier.',
  },
  {
    name: 'Bay Area Surf',
    city: 'Santa Clara / Bay Area',
    topLevel: 'MLS NEXT',
    leagues: ['MLS NEXT', 'NorCal Premier'],
    website: 'https://www.bayareasurf.com/',
    note: 'A leading feeder of players to the San Jose Earthquakes Academy.',
  },
  {
    name: 'SF Glens',
    city: 'San Francisco',
    topLevel: 'MLS NEXT',
    leagues: ['MLS NEXT (Academy/Tier 2)', 'NorCal Premier'],
    website: 'https://www.sfglens.com/',
    note: 'Founding member of the MLS NEXT Academy (Tier 2) division.',
  },
  {
    name: 'Sacramento United',
    city: 'Sacramento',
    topLevel: 'MLS NEXT',
    leagues: ['MLS NEXT (Academy/Tier 2)', 'NorCal Premier'],
    website: 'https://www.sacunited.com/',
    note: 'Founding member of the MLS NEXT Academy (Tier 2) division.',
  },
  {
    name: 'MVLA Soccer Club',
    city: 'Mountain View / Los Altos',
    topLevel: 'ECNL',
    leagues: ['ECNL', 'ECRL', 'NPL', 'NorCal Premier'],
    website: 'https://www.mvlasc.org/',
    note: 'Founding ECNL Boys NorCal club.',
  },
  {
    name: 'Mustang SC',
    city: 'Danville',
    topLevel: 'ECNL',
    leagues: ['ECNL', 'ECRL', 'NorCal Premier'],
    website: 'https://www.mustangsoccer.com/',
    note: 'Founding ECNL Boys NorCal club.',
  },
  {
    name: 'Davis Legacy',
    city: 'Davis',
    topLevel: 'ECNL',
    leagues: ['ECNL', 'ECRL', 'NorCal Premier'],
    website: 'https://www.davislegacysoccer.org/',
    note: 'Founding ECNL Boys NorCal club.',
  },
  {
    name: 'Marin FC',
    city: 'San Rafael / Marin',
    topLevel: 'ECNL',
    leagues: ['ECNL', 'ECRL', 'NorCal Premier'],
    website: 'https://marinfc.org/',
    note: 'Founding ECNL Boys NorCal club.',
  },
  {
    name: 'San Juan Soccer Club',
    city: 'Sacramento',
    topLevel: 'ECNL',
    leagues: ['ECNL', 'ECRL', 'NPL', 'NorCal Premier'],
    website: 'https://www.sanjuansc.com/',
    note: 'Founding ECNL Boys NorCal club.',
  },
  {
    name: 'Santa Rosa United',
    city: 'Santa Rosa',
    topLevel: 'ECNL',
    leagues: ['ECNL', 'ECRL', 'NorCal Premier'],
    website: 'https://www.santarosaunited.com/',
    note: 'Founding ECNL Boys NorCal club.',
  },
  {
    name: 'Placer United',
    city: 'Roseville / Placer County',
    topLevel: 'ECNL',
    leagues: ['ECNL', 'ECRL', 'NorCal Premier'],
    website: 'https://www.placerunited.com/',
  },
  {
    name: 'Santa Clara Sporting',
    city: 'Santa Clara',
    topLevel: 'ECNL',
    leagues: ['ECNL', 'ECRL', 'NorCal Premier'],
    website: 'https://www.santaclarasporting.com/',
  },
  {
    name: 'Los Gatos United',
    city: 'Los Gatos',
    topLevel: 'ECNL',
    leagues: ['ECNL', 'ECRL', 'NorCal Premier'],
    website: 'https://www.lgssc.org/',
    note: 'Promoted from ECRL NorCal into ECNL Boys for 2025-26.',
  },
  {
    name: 'Sacramento Republic FC Youth',
    city: 'Sacramento',
    topLevel: 'NPL',
    leagues: ['NPL', 'NorCal Premier'],
    website: 'https://www.sacrepublicfc.com/academy',
    note: 'Pro-club youth pathway tied to the USL Championship side.',
  },
  {
    name: 'Ballistic United SC',
    city: 'Pleasanton',
    topLevel: 'NorCal Premier',
    leagues: ['NPL', 'NorCal Premier'],
    website: 'https://www.busc.org/',
  },
  {
    name: 'Juventus SC',
    city: 'San Jose',
    topLevel: 'NorCal Premier',
    leagues: ['NPL', 'NorCal Premier'],
    website: 'https://www.juventussc.com/',
  },
  {
    name: 'Lamorinda SC',
    city: 'Moraga / Lafayette',
    topLevel: 'NorCal Premier',
    leagues: ['NPL', 'NorCal Premier'],
    website: 'https://www.lamorindasc.org/',
  },
];
