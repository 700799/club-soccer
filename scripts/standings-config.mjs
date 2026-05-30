// ---------------------------------------------------------------------------
// Which TotalGlobalSports (TGS) conferences the daily standings job pulls.
//
// ECNL / ECRL standings on theECNL.com are served by TGS's PUBLIC JSON API:
//   https://public.totalglobalsports.com/public/event/{eventId}/conference-standings/{conferenceId}
//
// The eventId encodes league + REGION + season; the second URL number is a
// fixed per-league "standings view" id (NOT the region):
//   ECNL Boys      → /conference-standings/12   (confirmed: NorCal 23-24 = 2863)
//   ECNL Girls     → /conference-standings/9    (confirmed across seasons)
//   ECNL RL (both) → /conference-standings/13   (confirmed: RL Girls NorCal = 2328)
// So the REGION comes entirely from the eventId.
//
// CONFIRMED 2025-26 event:
//   ECNL RL Boys NorCal 2025-26 = event 3906
// BEST-GUESS 2025-26 events (NOT yet confirmed — see accuracy gate below):
//   ECNL Boys NorCal ≈ 3905, ECNL Girls NorCal ≈ 3933, ECRL Girls NorCal ≈ 3907
//
// ACCURACY GATE: because three eventIds are unconfirmed, fetch-standings.mjs
// validates that the returned teams actually match known NorCal clubs. If a
// guessed eventId points at the wrong region/season, the names won't match and
// the table is REJECTED (logged) rather than shown — so the site never displays
// wrong-region data. Confirm IDs on theecnl.com, then they'll populate. To roll
// the season forward, find next season's eventIds the same way.
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
    conferenceId: 9,
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
