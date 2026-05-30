// ---------------------------------------------------------------------------
// Real player stories tied to each level of the pyramid — to show there are
// many paths, and that starting in rec (or staying there a while) is totally OK.
//
// Sources (verified May 2026):
//  - Alex Morgan / AYSO rec until ~14: https://en.wikipedia.org/wiki/Alex_Morgan ,
//    https://ayso.org/ayso-alumni/
//  - General: US Soccer / club bios.
// ---------------------------------------------------------------------------

export interface PlayerStory {
  // Which league level id this story is attached to (see data/leagues.ts).
  levelId: string;
  headline: string;
  body: string;
  source?: string;
}

export const playerStories: PlayerStory[] = [
  {
    levelId: 'rec',
    headline: 'Alex Morgan played rec (AYSO) until high school — and it was fine',
    body:
      'The two-time World Cup champion and Olympic gold medalist grew up playing recreational AYSO soccer in Diamond Bar, CA (her dad was her first coach) and didn\'t join a competitive club team until she was about 14. She has said AYSO is where she fell in love with the game. The takeaway: you do NOT have to be on an elite club at age 8 to reach the top.',
    source: 'https://ayso.org/ayso-alumni/',
  },
  {
    levelId: 'select',
    headline: 'Most pros started in select — not a national academy',
    body:
      'The overwhelming majority of college and pro players spent their early years in ordinary local club soccer, learning the game in a normal team environment. Select is where you build the foundation: consistent training, real games, and a love of competing. Late bloomers are the rule, not the exception.',
  },
  {
    levelId: 'norcal-premier',
    headline: 'The NorCal pyramid is built to let you climb',
    body:
      'Promotion and relegation between Copper → Premier means a hard-working team can rise division by division. Plenty of NorCal players have started in Bronze or Silver and worked up to Gold, NPL and beyond as they developed. Where you start is not where you finish.',
  },
  {
    levelId: 'npl',
    headline: 'A genuine national stage without the national price tag',
    body:
      'NPL teams compete for spots at NPL Finals and, in NorCal, the top boys team earns a promotion playoff into ECNL. It\'s proof you can chase a national pathway while keeping travel and cost more manageable than the very top tiers.',
  },
  {
    levelId: 'ecrl',
    headline: 'The "almost there" league that produces college players',
    body:
      'ECRL is full of players who get recruited to college every year. Clubs and players use it as the proving ground to earn promotion into ECNL — many athletes step up a tier after a strong ECRL season.',
  },
  {
    levelId: 'ecnl',
    headline: 'Over 90% of ECNL girls go on to play college soccer',
    body:
      'ECNL National Events are the premier college-recruiting showcases in the country, with hundreds of college coaches at each event. For players targeting college soccer, this is the most direct exposure platform — on both the girls\' and boys\' sides.',
  },
  {
    levelId: 'mls-next',
    headline: 'The academy-to-pro line: e.g., the San Jose Earthquakes Academy',
    body:
      'MLS NEXT is where homegrown pros are made. MLS club academies (locally, the San Jose Earthquakes) are fully funded and feed directly into MLS NEXT Pro and first-team homegrown contracts. It\'s the top of the youth pyramid and the start of the professional one.',
  },
];

export function storyForLevel(levelId: string) {
  return playerStories.find((s) => s.levelId === levelId);
}
