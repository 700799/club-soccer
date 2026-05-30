// ---------------------------------------------------------------------------
// Per-club college-commitment counts by division — the same shape as
// TopDrawerSoccer's "Commitments by Club" table (D1 / D2 / D3 / NAIA / NJCAA →
// Total).
//
// ACCURACY NOTE (important): these counts change as players commit, and the
// source (TopDrawerSoccer) is a dynamic page this build environment cannot
// fetch. We DO NOT fabricate numbers. Each club links to its LIVE TopDrawerSoccer
// commitments page; verified counts are filled in here with a `verified` month.
// A `null` count means "not yet verified" and the table shows a link instead of
// a number. To update: read the TDS table (or paste the numbers) and drop them
// in here.
//
// Source for the table format & data: TopDrawerSoccer — Commitments by Club
//   https://www.topdrawersoccer.com/commitments/club/men
//   https://www.topdrawersoccer.com/commitments/club/women
// (Marin FC boys is seeded from the live TDS table as a worked example.)
// ---------------------------------------------------------------------------

export type Count = number | null;

export interface ClubCommitments {
  club: string;
  gender: 'boys' | 'girls';
  d1: Count;
  d2: Count;
  d3: Count;
  naia: Count;
  njcaa: Count;
  tdsUrl: string;
  /** YYYY-MM when these counts were last confirmed against the source. */
  verified?: string;
}

export const COMMITMENTS_SOURCE = {
  men: 'https://www.topdrawersoccer.com/commitments/club/men',
  women: 'https://www.topdrawersoccer.com/commitments/club/women',
};

export function total(c: ClubCommitments): Count {
  const parts = [c.d1, c.d2, c.d3, c.naia, c.njcaa];
  if (parts.some((p) => p === null)) return null;
  return parts.reduce((a, b) => (a as number) + (b as number), 0);
}

// NorCal clubs. Counts are intentionally `null` (→ "see source" link) until
// confirmed against the live TDS table — except Marin FC, seeded from the
// screenshot/TDS as a verified example so the column format is real.
export const clubCommitments: ClubCommitments[] = [
  {
    club: 'Marin FC',
    gender: 'boys',
    d1: 1,
    d2: 0,
    d3: 0,
    naia: 0,
    njcaa: 0,
    tdsUrl: 'https://www.topdrawersoccer.com/search/?query=marin+fc',
    verified: '2026-05',
  },
  { club: 'San Jose Earthquakes Academy', gender: 'boys', d1: null, d2: null, d3: null, naia: null, njcaa: null, tdsUrl: 'https://www.topdrawersoccer.com/search/?query=san+jose+earthquakes' },
  { club: 'De Anza Force', gender: 'boys', d1: null, d2: null, d3: null, naia: null, njcaa: null, tdsUrl: 'https://www.topdrawersoccer.com/search/?query=de+anza+force' },
  { club: 'Bay Area Surf', gender: 'boys', d1: null, d2: null, d3: null, naia: null, njcaa: null, tdsUrl: 'https://www.topdrawersoccer.com/search/?query=bay+area+surf' },
  { club: 'MVLA', gender: 'boys', d1: null, d2: null, d3: null, naia: null, njcaa: null, tdsUrl: 'https://www.topdrawersoccer.com/search/?query=mvla' },
  { club: 'Mustang SC', gender: 'boys', d1: null, d2: null, d3: null, naia: null, njcaa: null, tdsUrl: 'https://www.topdrawersoccer.com/search/?query=mustang+sc' },
  { club: 'San Juan SC', gender: 'boys', d1: null, d2: null, d3: null, naia: null, njcaa: null, tdsUrl: 'https://www.topdrawersoccer.com/search/?query=san+juan' },
  { club: 'Davis Legacy', gender: 'boys', d1: null, d2: null, d3: null, naia: null, njcaa: null, tdsUrl: 'https://www.topdrawersoccer.com/search/?query=davis+legacy' },
  { club: 'Santa Rosa United', gender: 'boys', d1: null, d2: null, d3: null, naia: null, njcaa: null, tdsUrl: 'https://www.topdrawersoccer.com/search/?query=santa+rosa+united' },
  { club: 'Placer United', gender: 'boys', d1: null, d2: null, d3: null, naia: null, njcaa: null, tdsUrl: 'https://www.topdrawersoccer.com/search/?query=placer+united' },

  // Girls
  { club: 'MVLA', gender: 'girls', d1: null, d2: null, d3: null, naia: null, njcaa: null, tdsUrl: 'https://www.topdrawersoccer.com/search/?query=mvla' },
  { club: 'Mustang SC', gender: 'girls', d1: null, d2: null, d3: null, naia: null, njcaa: null, tdsUrl: 'https://www.topdrawersoccer.com/search/?query=mustang+sc' },
  { club: 'San Juan SC', gender: 'girls', d1: null, d2: null, d3: null, naia: null, njcaa: null, tdsUrl: 'https://www.topdrawersoccer.com/search/?query=san+juan' },
  { club: 'Marin FC', gender: 'girls', d1: null, d2: null, d3: null, naia: null, njcaa: null, tdsUrl: 'https://www.topdrawersoccer.com/search/?query=marin+fc' },
  { club: 'Pleasanton RAGE', gender: 'girls', d1: null, d2: null, d3: null, naia: null, njcaa: null, tdsUrl: 'https://www.topdrawersoccer.com/search/?query=pleasanton+rage' },
  { club: 'Davis Legacy', gender: 'girls', d1: null, d2: null, d3: null, naia: null, njcaa: null, tdsUrl: 'https://www.topdrawersoccer.com/search/?query=davis+legacy' },
  { club: 'Placer United', gender: 'girls', d1: null, d2: null, d3: null, naia: null, njcaa: null, tdsUrl: 'https://www.topdrawersoccer.com/search/?query=placer+united' },
  { club: 'Santa Rosa United', gender: 'girls', d1: null, d2: null, d3: null, naia: null, njcaa: null, tdsUrl: 'https://www.topdrawersoccer.com/search/?query=santa+rosa+united' },
];
