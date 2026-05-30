// ---------------------------------------------------------------------------
// Which TotalGlobalSports (TGS) conferences the daily standings job pulls.
//
// ECNL / ECRL standings on theECNL.com are served by TGS's PUBLIC JSON API:
//   https://public.totalglobalsports.com/public/event/{eventId}/conference-standings/{conferenceId}
//
// HOW TO FIND IDs: open the standings page on theecnl.com, choose a conference
// + age group, and read eventId/conferenceId from the embedded TGS request
// (iframe URL / network tab). Add an entry below and set enabled: true.
//
// The confirmed example is the ECNL Girls Regional League – NorCal conference
// (eventId 2328 / conferenceId 13). Exact field names + current-season IDs
// could not be verified from the build sandbox (the API blocks non-browser
// requests), so fetch-standings.mjs uses defensive fuzzy field-detection and
// the job runs live on GitHub's runners. Confirm the first run's logs, then add
// more conferences here.
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} ConferenceTarget
 * @property {string} id
 * @property {'ECNL Boys'|'ECNL Girls'|'ECRL Boys'|'ECRL Girls'} league
 * @property {string} name
 * @property {number} eventId
 * @property {number} conferenceId
 * @property {boolean} enabled
 */

/** @type {ConferenceTarget[]} */
export const conferenceTargets = [
  {
    id: 'ecrl-girls-norcal',
    league: 'ECRL Girls',
    name: 'ECNL Girls Regional League — NorCal',
    eventId: 2328,
    conferenceId: 13,
    enabled: true,
  },
  // TODO (add confirmed IDs, then flip enabled: true):
  // { id: 'ecnl-boys-norcal',  league: 'ECNL Boys',  name: 'ECNL Boys — Northern California',  eventId: 0, conferenceId: 0, enabled: false },
  // { id: 'ecnl-girls-norcal', league: 'ECNL Girls', name: 'ECNL Girls — Northern California', eventId: 0, conferenceId: 0, enabled: false },
  // { id: 'ecrl-boys-norcal',  league: 'ECRL Boys',  name: 'ECRL Boys — NorCal',              eventId: 0, conferenceId: 0, enabled: false },
];

export const TGS_BASE = 'https://public.totalglobalsports.com/public/event';

export const tgsStandingsUrl = (eventId, conferenceId) =>
  `${TGS_BASE}/${eventId}/conference-standings/${conferenceId}`;
