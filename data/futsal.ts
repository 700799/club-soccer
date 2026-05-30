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
