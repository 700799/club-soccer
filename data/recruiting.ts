// ---------------------------------------------------------------------------
// College & pro recruiting — which levels feed D1/D2/D3 and the pro ranks, and
// where to look up the ACTUAL, current commitments for each NorCal club.
//
// Why we link out for player lists: commitment lists change weekly and naming
// specific kids would be stale (and unverifiable) fast. The accurate approach is
// to (1) explain which leagues feed which college tiers, and (2) point at the
// official commitment trackers, which maintain per-club lists.
//
// Sources (verified May 2026):
//  - ECNL ~90%+ of girls play in college; National Events = top showcases:
//    https://theecnl.com/ , https://playclubsoccer.org/blog/girls-youth-soccer-pyramid
//  - TopDrawerSoccer commitments by club: https://www.topdrawersoccer.com/commitments/club/men
//  - SoccerWire commitment tracker: https://www.soccerwire.com/recruiting/
//  - MLS NEXT → MLS NEXT Pro / homegrown pathway: https://www.mlssoccer.com/mlsnext/
// ---------------------------------------------------------------------------

export interface RecruitingTier {
  level: string;
  color: string;
  feedsInto: string;
  detail: string;
}

// Which playing level typically feeds which college/pro tier. (General — strong
// players are recruited from every level; this is the typical exposure.)
export const recruitingTiers: RecruitingTier[] = [
  {
    level: 'MLS NEXT',
    color: '#ef4444',
    feedsInto: 'Pro (MLS NEXT Pro / homegrown), D1',
    detail:
      'The top boys platform. Direct line to MLS NEXT Pro and MLS homegrown contracts; the rest are heavily recruited by D1 programs. MLS academy players (e.g., SJ Earthquakes) sit closest to the pro pathway.',
  },
  {
    level: 'ECNL',
    color: '#a855f7',
    feedsInto: 'D1 & D2 (and pro)',
    detail:
      'Widely considered the top college-recruiting platform. National Events draw hundreds of college coaches; on the girls\' side 90%+ of ECNL players go on to play in college. The deepest D1 pipeline outside MLS academies.',
  },
  {
    level: 'ECRL',
    color: '#6366f1',
    feedsInto: 'D1, D2 & D3',
    detail:
      'The ECNL Regional League produces college commits every year across all divisions, and its recruitable events put players in front of coaches with less travel than full ECNL.',
  },
  {
    level: 'GA / DPL',
    color: '#ec4899',
    feedsInto: 'D1, D2 & D3',
    detail:
      'On the girls\' side, the Girls Academy and its DPL/ASPIRE tiers are a major college pipeline, with their own showcase events and college-coach attendance.',
  },
  {
    level: 'NPL',
    color: '#0ea5e9',
    feedsInto: 'D2, D3 & some D1',
    detail:
      'Strong NPL players earn D2/D3 spots and some D1 looks, especially via NPL Finals and showcase events — a real college pathway at lower cost.',
  },
  {
    level: 'NorCal Premier',
    color: '#16a34a',
    feedsInto: 'D3, NAIA, JUCO (and up)',
    detail:
      'Players are recruited from the regional divisions too — particularly to D3, NAIA and junior-college programs — and standouts move up the pyramid and get D1/D2 looks.',
  },
];

export interface PipelineClub {
  name: string;
  topLevel: string;
  // TopDrawerSoccer / club page where actual commitments can be verified.
  commitmentsUrl: string;
}

// The NorCal clubs that are the strongest college/pro pipelines (those competing
// at MLS NEXT / ECNL). Tap through to look up each club's real, current commits.
export const pipelineClubs: PipelineClub[] = [
  { name: 'San Jose Earthquakes Academy', topLevel: 'MLS NEXT', commitmentsUrl: 'https://www.topdrawersoccer.com/search/?query=san+jose+earthquakes' },
  { name: 'De Anza Force', topLevel: 'MLS NEXT / ECNL', commitmentsUrl: 'https://www.topdrawersoccer.com/search/?query=de+anza+force' },
  { name: 'Bay Area Surf', topLevel: 'MLS NEXT', commitmentsUrl: 'https://www.topdrawersoccer.com/search/?query=bay+area+surf' },
  { name: 'MVLA', topLevel: 'ECNL', commitmentsUrl: 'https://www.topdrawersoccer.com/search/?query=mvla' },
  { name: 'Mustang SC', topLevel: 'ECNL', commitmentsUrl: 'https://www.topdrawersoccer.com/search/?query=mustang' },
  { name: 'San Juan SC', topLevel: 'ECNL', commitmentsUrl: 'https://www.topdrawersoccer.com/search/?query=san+juan' },
  { name: 'Davis Legacy', topLevel: 'ECNL', commitmentsUrl: 'https://www.topdrawersoccer.com/search/?query=davis+legacy' },
  { name: 'Marin FC', topLevel: 'ECNL', commitmentsUrl: 'https://www.topdrawersoccer.com/search/?query=marin+fc' },
  { name: 'Santa Rosa United', topLevel: 'ECNL', commitmentsUrl: 'https://www.topdrawersoccer.com/search/?query=santa+rosa+united' },
  { name: 'Placer United', topLevel: 'ECNL', commitmentsUrl: 'https://www.topdrawersoccer.com/search/?query=placer+united' },
  { name: 'Pleasanton RAGE', topLevel: 'ECNL (Girls)', commitmentsUrl: 'https://www.topdrawersoccer.com/search/?query=pleasanton+rage' },
  { name: 'Sacramento United', topLevel: 'GA / MLS NEXT', commitmentsUrl: 'https://www.topdrawersoccer.com/search/?query=sacramento+united' },
];

export interface RecruitingResource {
  name: string;
  what: string;
  url: string;
}

export const recruitingResources: RecruitingResource[] = [
  {
    name: 'TopDrawerSoccer — Commitments by Club',
    what: 'Searchable database of college commitments organized by club. The fastest way to see where a specific NorCal club\'s players are going.',
    url: 'https://www.topdrawersoccer.com/commitments/club/men',
  },
  {
    name: 'SoccerWire — Commitment Tracker',
    what: 'A college-recruiting commitment tracker and featured-player verbal-commitment lists by graduation class.',
    url: 'https://www.soccerwire.com/recruiting/',
  },
  {
    name: 'TopDrawerSoccer — Commitments Search',
    what: 'Filter commitments by club, college, position and class year.',
    url: 'https://www.topdrawersoccer.com/search/commitments',
  },
];
