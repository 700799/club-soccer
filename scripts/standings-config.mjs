// ---------------------------------------------------------------------------
// Which TotalGlobalSports (TGS) conferences the daily standings job pulls.
//
// ECNL / ECRL standings on theECNL.com are served by TGS's PUBLIC JSON API:
//   https://public.totalglobalsports.com/public/event/{eventId}/conference-standings/{conferenceId}
//
// The eventId identifies a specific league + (often) region + season. When an
// event is itself region-specific (e.g. "ECRL Boys NorCal 2025-26" = event
// 3906), every table it returns is already NorCal data, so the fetcher can
// safely try a few candidate conferenceIds and keep the first that returns rows.
// For LEAGUE-WIDE events (one event holding many regions) do NOT rely on that —
// set the exact NorCal conferenceId, or you may pull another region.
//
// HOW TO FIND IDs: open the conference's standings on theecnl.com, choose the
// NorCal conference + an age group, and copy eventId/conferenceId from the
// embedded TotalGlobalSports request (iframe URL / network tab).
//
// NOTE: this build environment is firewalled from TGS, so the exact field names
// and some IDs could not be verified here. The fetcher uses defensive fuzzy
// field-detection + bounded conferenceId fallback and runs live on GitHub's
// runners; the first run's logs confirm what mapped. Verify, then enable more.
// ---------------------------------------------------------------------------

/**
 * @typedef {Object} ConferenceTarget
 * @property {string} id
 * @property {'ECNL Boys'|'ECNL Girls'|'ECRL Boys'|'ECRL Girls'} league
 * @property {string} name
 * @property {number} eventId
 * @property {number} conferenceId   // primary guess; fetcher also tries fallbacks
 * @property {boolean} enabled
 * @property {boolean} [regionSpecific] // true = safe to try fallback conf IDs
 */

/** @type {ConferenceTarget[]} */
export const conferenceTargets = [
  {
    // Confirmed current-season, NorCal-specific event (2025-26).
    id: 'ecrl-boys-norcal',
    league: 'ECRL Boys',
    name: 'ECNL Regional League Boys — NorCal',
    eventId: 3906,
    conferenceId: 13,
    enabled: true,
    regionSpecific: true,
  },
  // --- Add once confirmed on theecnl.com (kept disabled to avoid wrong data) ---
  {
    // event 3933 = ECNL Girls 2025-26 (league-wide). Set the exact NorCal
    // conferenceId before enabling — do NOT rely on fallbacks for league-wide events.
    id: 'ecnl-girls-norcal',
    league: 'ECNL Girls',
    name: 'ECNL Girls — Northern California',
    eventId: 3933,
    conferenceId: 0,
    enabled: false,
    regionSpecific: false,
  },
  {
    id: 'ecnl-boys-norcal',
    league: 'ECNL Boys',
    name: 'ECNL Boys — Northern California',
    eventId: 0,
    conferenceId: 0,
    enabled: false,
    regionSpecific: false,
  },
  {
    // 2328/13 was a confirmed NorCal ECRL Girls pairing but likely a prior
    // season — replace eventId with the current 2025-26 NorCal girls event.
    id: 'ecrl-girls-norcal',
    league: 'ECRL Girls',
    name: 'ECNL Regional League Girls — NorCal',
    eventId: 2328,
    conferenceId: 13,
    enabled: false,
    regionSpecific: true,
  },
];

export const TGS_BASE = 'https://public.totalglobalsports.com/public/event';

export const tgsStandingsUrl = (eventId, conferenceId) =>
  `${TGS_BASE}/${eventId}/conference-standings/${conferenceId}`;
