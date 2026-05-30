// ---------------------------------------------------------------------------
// Which TotalGlobalSports (TGS) conferences the daily standings job pulls.
//
// ECNL / ECRL standings on theECNL.com are served by TGS's PUBLIC JSON API:
//   https://public.totalglobalsports.com/public/event/{eventId}/conference-standings/{conferenceId}
//
// For 2025-26 each league is ONE event and the conferenceId selects the region.
// Verified across three seasons (URLs indexed publicly):
//   ECNL Boys   2025-26 → event 3905, NorCal = conf 12  (Northwest = 8)
//   ECNL Girls  2025-26 → event 3933, NorCal = conf 12  (Northwest = 8)
//   ECNL RL Boys  2025-26 → event 3906, NorCal = conf 13 (Northwest = 9)
//   ECNL RL Girls 2025-26 → event 3907, NorCal = conf 13 (Northwest = 9)
// (2024-25 were 3324/3323/.../3325; 2023-24 were 2863/2862 — same conf ids.)
//
// These are LEAGUE-WIDE events, so the conferenceId must be exact (conf 8 would
// return Northwest, not NorCal). The endpoint returns every age group for the
// region; fetch-standings.mjs groups the rows by age division.
//
// To roll the season forward, find next season's event IDs the same way:
// search the indexed TGS URLs, or read them off theecnl.com standings pages.
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} ConferenceTarget
 * @property {string} id
 * @property {'ECNL Boys'|'ECNL Girls'|'ECRL Boys'|'ECRL Girls'} league
 * @property {string} name
 * @property {number} eventId
 * @property {number} conferenceId  // exact region id (NorCal)
 * @property {boolean} enabled
 */

/** @type {ConferenceTarget[]} */
export const conferenceTargets = [
  {
    id: 'ecnl-boys-norcal',
    league: 'ECNL Boys',
    name: 'ECNL Boys — Northern California',
    eventId: 3905,
    conferenceId: 12,
    enabled: true,
  },
  {
    id: 'ecnl-girls-norcal',
    league: 'ECNL Girls',
    name: 'ECNL Girls — Northern California',
    eventId: 3933,
    conferenceId: 12,
    enabled: true,
  },
  {
    id: 'ecrl-boys-norcal',
    league: 'ECRL Boys',
    name: 'ECNL Regional League Boys — NorCal',
    eventId: 3906,
    conferenceId: 13,
    enabled: true,
  },
  {
    id: 'ecrl-girls-norcal',
    league: 'ECRL Girls',
    name: 'ECNL Regional League Girls — NorCal',
    eventId: 3907,
    conferenceId: 13,
    enabled: true,
  },
];

export const TGS_BASE = 'https://public.totalglobalsports.com/public/event';

export const tgsStandingsUrl = (eventId, conferenceId) =>
  `${TGS_BASE}/${eventId}/conference-standings/${conferenceId}`;
