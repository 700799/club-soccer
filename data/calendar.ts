// ---------------------------------------------------------------------------
// Showcase & talent-ID calendar — the big 2025-26 events where college and pro
// scouts watch, plus NorCal talent-ID (ODP/PDP) windows.
//
// Sources (verified May 2026):
//  - MLS NEXT 2025-26 schedule (Fest, Flex, Cup, Generation adidas Cup):
//    https://www.mlssoccer.com/mlsnext/news/2025-26-mls-next-schedule-key-dates-to-know
//  - ECNL 2025-26 National Event schedule:
//    https://theecnl.com/news/2025/4/17/ecnl-announces-2025-26-national-event-schedule.aspx
//  - Cal North ODP tryouts: https://www.calnorth.org/odp-tryouts
//  - NorCal PDP: https://norcalpremier.com/competition/pdp/resource/program-overview/
//
// Dates are confirmed where a specific date is given; "window" items are the
// typical time of year. Always confirm exact dates on the official links.
// ---------------------------------------------------------------------------

export type EventKind = 'showcase' | 'talent-id' | 'futsal';
export type Gender = 'boys' | 'girls' | 'both';

export interface CalendarEvent {
  name: string;
  kind: EventKind;
  gender: Gender;
  dates: string;       // human-readable
  sortKey: string;     // YYYY-MM for ordering (approx is fine)
  location: string;
  blurb: string;
  url: string;
  confirmed: boolean;  // true = specific announced dates; false = typical window
}

export const calendarEvents: CalendarEvent[] = [
  {
    name: 'MLS NEXT Fest',
    kind: 'showcase',
    gender: 'boys',
    dates: 'Dec 4–15, 2025',
    sortKey: '2025-12',
    location: 'Mesa, Arizona',
    blurb:
      'The largest talent-ID event in U.S. youth soccer — 1,000+ teams, U13–U19, with hundreds of college, pro and national-team scouts watching ~30,000 players.',
    url: 'https://www.mlssoccer.com/mlsnext/',
    confirmed: true,
  },
  {
    name: 'NorCal Futsal State Cup',
    kind: 'futsal',
    gender: 'both',
    dates: 'February 2026 (winter)',
    sortKey: '2026-02',
    location: 'Cal Expo, Sacramento',
    blurb:
      'NorCal\'s marquee winter futsal championship for U9–U14 boys & girls.',
    url: 'https://norcalpremier.com/competition/futsal/news/',
    confirmed: false,
  },
  {
    name: 'ECNL National Events (multiple)',
    kind: 'showcase',
    gender: 'both',
    dates: 'Fall 2025 – Spring 2026',
    sortKey: '2026-01',
    location: 'Nationwide',
    blurb:
      '24 regular-season ECNL National Events plus 14 ECNL Regional League events across the year — the premier college-recruiting showcases for boys & girls.',
    url: 'https://theecnl.com/news/2025/4/17/ecnl-announces-2025-26-national-event-schedule.aspx',
    confirmed: true,
  },
  {
    name: 'Generation adidas Cup',
    kind: 'showcase',
    gender: 'boys',
    dates: 'Mar 27 – Apr 4, 2026',
    sortKey: '2026-03',
    location: 'IMG Academy, Bradenton, FL',
    blurb:
      'Elite MLS NEXT / international academy competition — a top stage for the best academy boys.',
    url: 'https://www.mlssoccer.com/mlsnext/',
    confirmed: true,
  },
  {
    name: 'MLS NEXT Flex',
    kind: 'showcase',
    gender: 'boys',
    dates: 'Apr 23–28, 2026',
    sortKey: '2026-04',
    location: 'Frisco, Texas',
    blurb: 'A spring MLS NEXT showcase event for additional scouting exposure.',
    url: 'https://www.mlssoccer.com/mlsnext/',
    confirmed: true,
  },
  {
    name: 'Cal North ODP Tryouts',
    kind: 'talent-id',
    gender: 'both',
    dates: 'Spring/Summer window (annual)',
    sortKey: '2026-05',
    location: 'Northern California',
    blurb:
      'Olympic Development Program birth-year pool tryouts — the U.S. Soccer-sanctioned NorCal talent-ID pathway (State → Western Regional → National).',
    url: 'https://www.calnorth.org/odp-tryouts',
    confirmed: false,
  },
  {
    name: 'NorCal PDP Identification',
    kind: 'talent-id',
    gender: 'both',
    dates: 'Seasonal windows (annual)',
    sortKey: '2026-05',
    location: 'Northern California',
    blurb:
      'NorCal Premier\'s Player Development Program — US Club Soccer id2/PDP identification & showcasing for top NorCal players.',
    url: 'https://norcalpremier.com/competition/pdp/resource/program-overview/',
    confirmed: false,
  },
  {
    name: 'MLS NEXT Cup',
    kind: 'showcase',
    gender: 'boys',
    dates: 'May 23–31, 2026',
    sortKey: '2026-05b',
    location: 'Salt Lake City, Utah',
    blurb: 'The MLS NEXT season-ending national championship (U13–U19).',
    url: 'https://www.mlssoccer.com/mlsnext/',
    confirmed: true,
  },
];
