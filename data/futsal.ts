// ---------------------------------------------------------------------------
// Futsal & indoor soccer in Northern California — a big part of the NorCal
// soccer calendar, especially in winter.
//
// Sources (verified May 2026):
//  - NorCal Premier Winter League & Futsal: https://norcalpremier.com/winter-league-and-futsal-registration-now-open/
//  - NorCal Futsal State Cup (CalExpo, Sacramento): https://norcalpremier.com/23-teams-take-home-futsal-state-cup-titles/
//  - US Youth Futsal / Northern California Premier Futsal: http://www.usyouthfutsal.com/page/show/3635247-northern-california-premier-futsal
//  - (LIGA NorCal is an ADULT futsal league — intentionally not listed here.)
//  - COPA Walnut Creek indoor facility: https://copastc.com/blog/norcalpremier/
//  - Ballistic United "Bulldogs" Futsal (2015 USFF national champs): https://bulldogsfutsal.com/about/
// ---------------------------------------------------------------------------

export const futsalIntro =
  'Futsal — the 5-a-side, small-ball indoor game played on a hard court — is huge in NorCal, especially in winter when outdoor seasons pause. The smaller ball and tight space force quick decisions, close control and creativity, which is why so many coaches use futsal to develop technical skill. NorCal Premier runs a full futsal program alongside winter outdoor leagues.';

export interface FutsalProgram {
  name: string;
  what: string;
  who: string;
  url: string;
}

export const futsalPrograms: FutsalProgram[] = [
  {
    name: 'NorCal Premier Futsal & Winter League',
    what:
      'NorCal Premier runs futsal playdates and a Winter League (roughly January–February) to keep teams sharp between outdoor seasons.',
    who: 'U9–U19 boys & girls',
    url: 'https://norcalpremier.com/competition/futsal/news/',
  },
  {
    name: 'NorCal Futsal State Cup',
    what:
      'The marquee event — held at Cal Expo in Sacramento — where dozens of teams compete for futsal state titles each winter.',
    who: 'U9 (2015) – U14 (2010), boys & girls',
    url: 'https://norcalpremier.com/23-teams-take-home-futsal-state-cup-titles/',
  },
  {
    name: 'US Youth Futsal — Northern California Premier Futsal',
    what:
      'Sanctioned by U.S. Youth Futsal (a US Soccer affiliate), with regional play and a path to national futsal events.',
    who: 'Youth age groups',
    url: 'http://www.usyouthfutsal.com/page/show/3635247-northern-california-premier-futsal',
  },
];

// NorCal futsal clubs & leagues, taggable by county for a pill filter.
// Sources: California North Futsal league directory (californiafutsalnorth.com),
// Futsal Factory (Sacramento/Yolo/Placer), 925 Futsal (Contra Costa/Alameda),
// Marin Futsal League (Mill Valley), Mustang Futsal (Danville), Futsal 415 (SF),
// NorCal Premier futsal, US Youth Futsal NorCal.
export type FutsalCounty =
  | 'San Francisco'
  | 'Marin'
  | 'Alameda'
  | 'Contra Costa'
  | 'Santa Clara'
  | 'San Mateo'
  | 'Sacramento'
  | 'Placer'
  | 'Yolo'
  | 'Sonoma';

export interface FutsalClub {
  name: string;
  city: string;
  county: FutsalCounty;
  note?: string;
  url?: string;
}

export const futsalCounties: FutsalCounty[] = [
  'San Francisco',
  'Marin',
  'Alameda',
  'Contra Costa',
  'San Mateo',
  'Santa Clara',
  'Sonoma',
  'Sacramento',
  'Placer',
  'Yolo',
];

export const futsalClubs: FutsalClub[] = [
  // San Francisco
  { name: 'Futsal 415', city: 'San Francisco', county: 'San Francisco', note: 'SF futsal club — leagues, tournaments and regular training.', url: 'https://www.futsal415.com/' },
  { name: 'SF Glens (futsal)', city: 'San Francisco', county: 'San Francisco', note: 'Club futsal programming through the winter.' },
  // Marin
  { name: 'Marin Futsal League', city: 'Mill Valley', county: 'Marin', note: 'One of the longest-running, largest futsal leagues in NorCal.', url: 'https://www.marinfutsal.com/' },
  { name: 'Marin FC (futsal)', city: 'San Rafael', county: 'Marin', note: 'Club winter futsal.' },
  // Alameda
  { name: '925 Futsal', city: 'San Ramon / Dublin', county: 'Alameda', note: 'Elite youth futsal across Contra Costa & Alameda.', url: 'https://www.925futsal.com/' },
  { name: 'Ballistic United "Bulldogs" Futsal', city: 'Pleasanton', county: 'Alameda', note: 'USFF national champions — Pleasanton\'s futsal program.', url: 'https://bulldogsfutsal.com/' },
  { name: 'Hayward Futsal League', city: 'Hayward', county: 'Alameda', note: 'Local league via California North Futsal.' },
  // Contra Costa
  { name: 'Mustang Futsal League', city: 'Danville', county: 'Contra Costa', note: 'Organized by Mustang SC, open to all.', url: 'https://www.mustangsoccer.com/' },
  { name: 'COPA Futsal (Walnut Creek)', city: 'Walnut Creek', county: 'Contra Costa', note: 'Plays at COPA\'s ~100k sq ft indoor complex.', url: 'https://copastc.com/' },
  { name: '925 Futsal (East Bay)', city: 'San Ramon', county: 'Contra Costa', note: 'Contra Costa & Alameda elite youth futsal.', url: 'https://www.925futsal.com/' },
  // San Mateo
  { name: 'Peninsula Futsal', city: 'San Mateo / Peninsula', county: 'San Mateo', note: 'Peninsula-area futsal play.' },
  // Santa Clara
  { name: 'San Jose Futsal League', city: 'San Jose', county: 'Santa Clara', note: 'South Bay league via California North Futsal.' },
  { name: 'Silicon Valley Futsal', city: 'Santa Clara', county: 'Santa Clara', note: 'South Bay youth futsal.' },
  // Sonoma
  { name: 'North Bay / Sonoma Futsal', city: 'Santa Rosa', county: 'Sonoma', note: 'North Bay futsal play.' },
  // Sacramento
  { name: 'Futsal Factory Academy', city: 'Sacramento / Mather', county: 'Sacramento', note: 'Runs the NorCal Futsal League (competitive) + developmental league.', url: 'https://www.futsal-factory.com/' },
  { name: 'Anthem FC (futsal)', city: 'Sacramento', county: 'Sacramento', note: 'Sacramento futsal — leagues and tournaments.' },
  { name: 'Sacramento Futsal League', city: 'Sacramento', county: 'Sacramento', note: 'Regional league; US Youth Futsal NorCal championships hosted here.', url: 'https://www.usyouthfutsal.com/sacramento' },
  // Placer
  { name: 'NorCal Futsal League (Rocklin)', city: 'Rocklin', county: 'Placer', note: 'Futsal Factory–run competitive league.', url: 'https://www.futsal-factory.com/' },
  { name: 'Placer Futsal', city: 'Roseville / Placer', county: 'Placer', note: 'Placer County futsal via Futsal Factory.' },
  // Yolo
  { name: 'Davis / Yolo Futsal', city: 'Davis', county: 'Yolo', note: 'Yolo County futsal (Futsal Factory service area).' },
];

export interface IndoorNote {
  title: string;
  detail: string;
}

export const indoorNotes: IndoorNote[] = [
  {
    title: 'Why futsal develops players',
    detail:
      'A smaller, heavier, low-bounce ball and tight court mean far more touches per minute, faster decisions and better close control — skills that carry straight back to the 11-a-side game.',
  },
  {
    title: 'It\'s a winter staple',
    detail:
      'When NorCal\'s outdoor leagues pause in winter, futsal and indoor keep players fit, sharp and competing — a big reason it\'s woven into the NorCal calendar.',
  },
  {
    title: 'NorCal has elite indoor facilities',
    detail:
      'COPA\'s Walnut Creek complex — about 100,000 sq ft — is one of the largest private indoor soccer & futsal training facilities in the U.S., with multiple indoor fields and futsal courts.',
  },
  {
    title: 'NorCal clubs win nationally',
    detail:
      'Pleasanton\'s Ballistic United "Bulldogs" Futsal program won a USFF national championship — proof NorCal futsal competes at the top.',
  },
];
