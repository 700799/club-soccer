// ---------------------------------------------------------------------------
// Soccer insole guide + affiliate data for Superfeet and Currex.
//
// >>> AFFILIATE SETUP <<<
// Drop your affiliate/referral tags into AFFILIATE_TAGS below. Every product
// link runs through withRef(), which appends your tag, so you only edit it once.
// Apply for the programs here:
//   - Superfeet affiliates: https://www.superfeet.com/pages/affiliates
//   - Currex (affiliate via their retail/partner program): https://currex.com/
//
// Product facts verified May 2026:
//   - Currex SupportSTP comes in LOW / MEDIUM / HIGH dynamic arch profiles, and
//     counter-intuitively the LOW profile is the STIFFEST (it supports a flexible,
//     low arch) while the HIGH profile is the most FLEXIBLE (a high arch is more
//     rigid already): https://currex.com/products/supportstp
//   - Superfeet runs firmer/more structured with a deep heel cup; Sport Ultralight
//     is its thin cleat-friendly model and the carbon EVOLyte line adds a stiff,
//     responsive cap: https://www.superfeet.com/collections/cleat-sports
// ---------------------------------------------------------------------------

export const AFFILIATE_TAGS = {
  // TODO: replace the placeholders with your real affiliate IDs.
  superfeet: { param: 'utm_source', value: 'norcalsoccerguide' },
  currex: { param: 'ref', value: 'norcalsoccerguide' },
};

export function withRef(
  url: string,
  brand: keyof typeof AFFILIATE_TAGS,
): string {
  const tag = AFFILIATE_TAGS[brand];
  if (!tag) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}${tag.param}=${encodeURIComponent(tag.value)}`;
}

export type ArchType = 'low' | 'medium' | 'high';
export type Firmness = 'soft' | 'balanced' | 'firm';
export type Goal = 'performance' | 'stability' | 'pain-relief';

export interface ArchInfo {
  type: ArchType;
  label: string;
  wetTest: string;
  feels: string;
  tendsToward: string;
}

// The "wet foot test": wet your foot, step on paper, look at the print.
export const archTypes: ArchInfo[] = [
  {
    type: 'low',
    label: 'Low / Flat arch',
    wetTest: 'You see almost your whole sole — little or no inward curve.',
    feels: 'Feet may feel they "collapse" inward; shoes wear on the inside edge.',
    tendsToward: 'Overpronation. Usually benefits from MORE structured support.',
  },
  {
    type: 'medium',
    label: 'Medium / Neutral arch',
    wetTest: 'You see about half your arch — a clear but moderate curve.',
    feels: 'The most common, balanced foot type.',
    tendsToward: 'Neutral. Most insole profiles work; match comfort and goal.',
  },
  {
    type: 'high',
    label: 'High arch',
    wetTest: 'Only a thin band connects heel and forefoot — a deep curve.',
    feels: 'A rigid foot that absorbs less shock; shoes wear on the outer edge.',
    tendsToward: 'Underpronation/supination. Wants cushioning + a flexible arch.',
  },
];

export interface Product {
  brand: 'Superfeet' | 'Currex';
  name: string;
  profile: string;
  firmness: Firmness;
  archMatch: ArchType[];
  bestFor: Goal[];
  cleatFriendly: boolean;
  priceUsd: string;
  blurb: string;
  url: string;
}

export const products: Product[] = [
  // --- Superfeet (firm, structured, stabilizing) ---
  {
    brand: 'Superfeet',
    name: 'Sport Ultralight',
    profile: 'Thin, low-volume — built for tight cleats',
    firmness: 'firm',
    archMatch: ['low', 'medium'],
    bestFor: ['stability', 'performance'],
    cleatFriendly: true,
    priceUsd: '~$50',
    blurb:
      "Superfeet's thinnest stabilizing insole, designed for tight-fitting footwear like soccer cleats. Firm structure and a heel cup for control without stealing room.",
    url: 'https://www.superfeet.com/products/sport-ultralight',
  },
  {
    brand: 'Superfeet',
    name: 'Run Support Low Arch (Carbon / EVOLyte)',
    profile: 'Low-profile carbon cap, very thin',
    firmness: 'firm',
    archMatch: ['low'],
    bestFor: ['stability', 'performance'],
    cleatFriendly: true,
    priceUsd: '~$55–$60',
    blurb:
      'The carbon-fiber EVOLyte cap is stiff and responsive yet ultra-thin — great for low arches that want structure and quick energy return in cleats.',
    url: 'https://www.superfeet.com/products/run-support-low-arch-new',
  },
  {
    brand: 'Superfeet',
    name: 'All-Purpose Support High Arch',
    profile: 'Structured support shaped for a high arch',
    firmness: 'firm',
    archMatch: ['high', 'medium'],
    bestFor: ['stability', 'pain-relief'],
    cleatFriendly: false,
    priceUsd: '~$50',
    blurb:
      'For high arches that still want firm, corrective support and a deep, stabilizing heel cup. Best in trainers/turf shoes with room to spare.',
    url: 'https://www.superfeet.com/collections/cleat-sports',
  },
  // --- Currex (dynamic, flexible, performance) ---
  {
    brand: 'Currex',
    name: 'SupportSTP — LOW profile',
    profile: 'LOW dynamic arch (the STIFFEST of the three)',
    firmness: 'firm',
    archMatch: ['low'],
    bestFor: ['stability', 'pain-relief'],
    cleatFriendly: true,
    priceUsd: '~$50',
    blurb:
      'Counter-intuitively, Currex\'s LOW profile is its stiffest — it props up a flexible, low/flat arch with dynamic support and a decoupled, cushioned heel.',
    url: 'https://currex.com/products/supportstp',
  },
  {
    brand: 'Currex',
    name: 'SupportSTP — MEDIUM profile',
    profile: 'MEDIUM dynamic arch',
    firmness: 'balanced',
    archMatch: ['medium'],
    bestFor: ['performance', 'stability', 'pain-relief'],
    cleatFriendly: true,
    priceUsd: '~$50',
    blurb:
      'The do-everything pick for neutral feet. Dynamic Arch Technology flexes with each step while still guiding the foot and returning energy.',
    url: 'https://currex.com/products/supportstp',
  },
  {
    brand: 'Currex',
    name: 'SupportSTP — HIGH profile',
    profile: 'HIGH dynamic arch (the most FLEXIBLE)',
    firmness: 'soft',
    archMatch: ['high'],
    bestFor: ['performance', 'pain-relief'],
    cleatFriendly: true,
    priceUsd: '~$50',
    blurb:
      'The HIGH profile is the most flexible — it matches an already-rigid high arch and adds the cushioning a high-arched, shock-poor foot needs.',
    url: 'https://currex.com/products/supportstp',
  },
  {
    brand: 'Currex',
    name: 'ActivePro',
    profile: 'Dynamic arch, tuned for cutting & multidirectional sport',
    firmness: 'balanced',
    archMatch: ['low', 'medium', 'high'],
    bestFor: ['performance'],
    cleatFriendly: true,
    priceUsd: '~$55',
    blurb:
      'Currex\'s athletic insole for stop-start, cut-and-pivot sports — comes in low/med/high profiles, so pick the one that matches your arch.',
    url: 'https://currex.com/products/activepro',
  },
];

// Quick brand-level contrast for the comparison panel.
export const brandCompare = [
  {
    brand: 'Superfeet' as const,
    philosophy: 'Firm, structured, corrective',
    archSupport: 'Rigid support + a deep heel cup for maximum stability and alignment',
    firmness: 'Firmer / stiffer — more control',
    bestWhen:
      'You want immediate, structured support and stability, are recovering from or guarding against ankle/arch issues, or overpronate.',
    cleatPick: 'Sport Ultralight (thin) or the carbon Run Support Low Arch',
    affiliate: 'https://www.superfeet.com/collections/cleat-sports',
    brandKey: 'superfeet' as const,
  },
  {
    brand: 'Currex' as const,
    philosophy: 'Dynamic, flexible, performance',
    archSupport: 'Dynamic Arch Technology in LOW/MEDIUM/HIGH profiles that flexes and returns energy',
    firmness: 'More flexible — adapts to your movement',
    bestWhen:
      'You want performance, energy return and a natural-feeling, dynamic support that moves with your foot during cutting and sprinting.',
    cleatPick: 'SupportSTP or ActivePro in the profile that matches your arch',
    affiliate: 'https://currex.com/products/supportstp',
    brandKey: 'currex' as const,
  },
];
