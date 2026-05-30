// ---------------------------------------------------------------------------
// FORWARD-LOOKING showcase & talent-ID calendar — the upcoming events where
// college and pro scouts watch, plus NorCal talent-ID (ODP/PDP) windows.
//
// "Today" for this guide is mid-2026, so this lists what's AHEAD (the 2026-27
// cycle and recurring annual windows), not events that have already happened.
// Specific dates are confirmed where announced; recurring events show the
// typical time of year until the next cycle's exact dates are published.
//
// Sources (verified May 2026):
//  - MLS NEXT event structure (Fest / Flex / Cup, annual cadence):
//    https://www.mlssoccer.com/mlsnext/
//  - ECNL National Event schedule structure:
//    https://theecnl.com/sports/ecnl-boys/schedule/ , https://theecnl.com/sports/ecnl-girls/schedule/
//  - Cal North ODP tryouts: https://www.calnorth.org/odp-tryouts
//  - NorCal PDP: https://norcalpremier.com/competition/pdp/resource/program-overview/
//  - NorCal Futsal (winter): https://norcalpremier.com/competition/futsal/news/
//
// To refresh: when the 2026-27 exact dates are announced, drop them into
// `dates`, set `confirmed: true`, and (if needed) nudge `sortKey`.
// ---------------------------------------------------------------------------

export type EventKind = 'showcase' | 'talent-id' | 'futsal';
export type Gender = 'boys' | 'girls' | 'both';

export interface CalendarEvent {
  name: string;
  kind: EventKind;
  gender: Gender;
  dates: string;       // human-readable (forward-looking)
  sortKey: string;     // YYYY-MM for ordering
  location: string;
  blurb: string;
  url: string;
  confirmed: boolean;  // true = specific announced dates; false = typical window
}

// Upcoming, in chronological order. Kept future-facing — refresh as the
// 2026-27 schedules are published.
export const calendarEvents: CalendarEvent[] = [
  {
    name: 'Cal North ODP Tryouts',
    kind: 'talent-id',
    gender: 'both',
    dates: 'Summer 2026 (annual window)',
    sortKey: '2026-06',
    location: 'Northern California',
    blurb:
      'Olympic Development Program birth-year pool tryouts — the U.S. Soccer-sanctioned NorCal talent-ID pathway (State → Western Regional → National). Watch for the next window to open.',
    url: 'https://www.calnorth.org/odp-tryouts',
    confirmed: false,
  },
  {
    name: 'Club Tryouts / Team Formation',
    kind: 'talent-id',
    gender: 'both',
    dates: 'Late spring – summer 2026',
    sortKey: '2026-06b',
    location: 'NorCal clubs',
    blurb:
      'Most NorCal clubs hold open tryouts and form 2026-27 rosters in this window — the on-ramp to every level from select up to ECNL.',
    url: 'https://norcalpremier.com/',
    confirmed: false,
  },
  {
    name: 'MLS NEXT 2026-27 Season Kickoff',
    kind: 'showcase',
    gender: 'boys',
    dates: 'Fall 2026',
    sortKey: '2026-09',
    location: 'Nationwide',
    blurb:
      'The expanded 2026-27 MLS NEXT season begins (the league moves to school-year age groups). Regular-season play is the runway to the winter/spring showcases below.',
    url: 'https://www.mlssoccer.com/mlsnext/',
    confirmed: false,
  },
  {
    name: 'ECNL National Events (2026-27)',
    kind: 'showcase',
    gender: 'both',
    dates: 'Fall 2026 – Spring 2027',
    sortKey: '2026-10',
    location: 'Nationwide',
    blurb:
      'The premier college-recruiting showcases for boys & girls — two dozen-plus National Events across the season, each drawing hundreds of college coaches. NorCal clubs travel to these.',
    url: 'https://theecnl.com/',
    confirmed: false,
  },
  {
    name: 'NorCal Futsal & Winter League',
    kind: 'futsal',
    gender: 'both',
    dates: 'Winter 2026-27 (Jan–Feb)',
    sortKey: '2027-01',
    location: 'Northern California',
    blurb:
      'NorCal Premier futsal play and the Futsal State Cup (Cal Expo, Sacramento) keep players sharp through the winter break. U9–U14 for the State Cup.',
    url: 'https://norcalpremier.com/competition/futsal/news/',
    confirmed: false,
  },
  {
    name: 'MLS NEXT Fest 2026',
    kind: 'showcase',
    gender: 'boys',
    dates: 'December 2026',
    sortKey: '2026-12',
    location: 'Mesa, Arizona (recent host)',
    blurb:
      'The largest talent-ID event in U.S. youth soccer — 1,000+ teams, U13–U19, with hundreds of college, pro and national-team scouts. The marquee winter showcase to aim for.',
    url: 'https://www.mlssoccer.com/mlsnext/',
    confirmed: false,
  },
  {
    name: 'Generation adidas Cup 2027',
    kind: 'showcase',
    gender: 'boys',
    dates: 'Spring 2027',
    sortKey: '2027-03',
    location: 'IMG Academy, Bradenton, FL (recent host)',
    blurb:
      'Elite MLS NEXT / international academy competition — a top stage for the best academy boys. Invitation via MLS NEXT performance.',
    url: 'https://www.mlssoccer.com/mlsnext/',
    confirmed: false,
  },
  {
    name: 'MLS NEXT Cup 2027',
    kind: 'showcase',
    gender: 'boys',
    dates: 'Late spring 2027',
    sortKey: '2027-05',
    location: 'TBA',
    blurb:
      'The MLS NEXT season-ending national championship (U13–U19) — the goal every academy team plays toward.',
    url: 'https://www.mlssoccer.com/mlsnext/',
    confirmed: false,
  },
  {
    name: 'NorCal PDP Identification',
    kind: 'talent-id',
    gender: 'both',
    dates: 'Ongoing seasonal windows',
    sortKey: '2027-06',
    location: 'Northern California',
    blurb:
      'NorCal Premier\'s Player Development Program — US Club Soccer id2/PDP identification & showcasing for top NorCal players. Runs in cycles through the year.',
    url: 'https://norcalpremier.com/competition/pdp/resource/program-overview/',
    confirmed: false,
  },
];
