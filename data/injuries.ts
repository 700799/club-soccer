// ---------------------------------------------------------------------------
// Youth soccer injury statistics & prevention.
//
// Sources (peer-reviewed / clinical):
//  - Injury incidence & risk factors in youth soccer (systematic review):
//    https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9806741/
//  - ACL incidence in youth & male soccer (17,108 players, age sub-analysis):
//    https://www.researchgate.net/publication/368475757
//  - ACL prevention / neuromuscular programs:
//    https://pmc.ncbi.nlm.nih.gov/articles/PMC2938325/
//  - Lateral ankle sprain epidemiology in soccer:
//    https://www.sciencedirect.com/science/article/abs/pii/S0020138324004054
//
// These figures are drawn from published research. They are educational, not
// medical advice — see a sports-medicine professional for any specific concern.
// ---------------------------------------------------------------------------

export interface AgeAclStat {
  ageGroup: string;
  /** Approximate ACL injury incidence (% of players) reported for the band. */
  aclIncidencePct: number;
  context: string;
}

// ACL injury incidence rises sharply with age across youth/male soccer.
export const aclByAge: AgeAclStat[] = [
  {
    ageGroup: 'Under 13',
    aclIncidencePct: 0.3,
    context: 'ACL tears are uncommon before puberty; growth-plate issues dominate instead.',
  },
  {
    ageGroup: 'Under 15',
    aclIncidencePct: 1.3,
    context: 'Rates climb as players hit growth spurts (boys ~14–15, girls ~12–13).',
  },
  {
    ageGroup: 'Under 17',
    aclIncidencePct: 2.5,
    context: 'Faster, more physical play and higher match loads raise risk further.',
  },
  {
    ageGroup: 'Under 20',
    aclIncidencePct: 3.8,
    context: 'The highest youth incidence — adult-level speed and contact.',
  },
];

export interface KeyStat {
  value: string;
  label: string;
  detail: string;
}

export const keyInjuryStats: KeyStat[] = [
  {
    value: '53%',
    label: 'fewer ACL injuries',
    detail:
      'Players who do a structured injury-prevention (neuromuscular warm-up) program cut ACL injury rates by about half.',
  },
  {
    value: '4–6×',
    label: 'higher ACL risk in girls',
    detail:
      'Female players are 4–6 times more likely to tear an ACL than boys in the same sport.',
  },
  {
    value: '30.8%',
    label: 'of youth injuries hit the knee',
    detail:
      'Across youth soccer, roughly 31% of all injuries involve the knee; about 6.7% are ACL tears.',
  },
  {
    value: 'Ankle',
    label: 'most common acute injury',
    detail:
      'Lateral ankle sprains are the single most frequent acute injury; in young males ankle and thigh lead the list.',
  },
];

export interface CommonInjury {
  name: string;
  area: string;
  typicalAge: string;
  what: string;
  footwearLink: boolean; // does insole/footwear choice meaningfully help?
}

export const commonInjuries: CommonInjury[] = [
  {
    name: 'Lateral ankle sprain',
    area: 'Ankle',
    typicalAge: 'All ages',
    what:
      'The most common acute soccer injury — the foot rolls inward, stressing the outside ligaments. Stability and a good heel cup help.',
    footwearLink: true,
  },
  {
    name: 'ACL tear',
    area: 'Knee',
    typicalAge: 'Risk rises 14–15 (boys), 12–13 (girls)',
    what:
      'Often non-contact, on cutting or landing. The headline injury of the sport. Neuromuscular training is the proven defense.',
    footwearLink: false,
  },
  {
    name: 'Hamstring / quad / groin strain',
    area: 'Thigh & hip',
    typicalAge: 'Teens & up',
    what:
      'Muscle strains from sprinting and kicking. Male players are especially prone. Warm-up and load management matter most.',
    footwearLink: false,
  },
  {
    name: "Sever's disease (calcaneal apophysitis)",
    area: 'Heel',
    typicalAge: 'Ages 8–14',
    what:
      'Heel-growth-plate irritation in younger players — a leading cause of heel pain. Cushioned heel support and insoles can relieve it.',
    footwearLink: true,
  },
  {
    name: "Osgood-Schlatter disease",
    area: 'Knee (shin/tibia)',
    typicalAge: 'Ages 10–15',
    what:
      'Growth-plate pain just below the kneecap during growth spurts. Managed with load control and stretching.',
    footwearLink: false,
  },
  {
    name: 'Plantar fasciitis / arch pain',
    area: 'Foot / arch',
    typicalAge: 'Teens & up',
    what:
      'Overuse irritation of the arch, aggravated by flat, unsupportive cleats. Proper arch support is directly protective.',
    footwearLink: true,
  },
  {
    name: 'Stress fracture',
    area: 'Foot / shin',
    typicalAge: 'Teens & up',
    what:
      'Overuse bone injury from spikes in training volume. Cushioning and gradual load increases reduce risk.',
    footwearLink: true,
  },
];

export interface PreventionStep {
  title: string;
  detail: string;
}

// The FIFA 11+ warm-up is the best-evidenced program for youth soccer.
export const preventionProgram = {
  name: 'FIFA 11+',
  summary:
    'A 15–20 minute structured warm-up (running, strength, plyometrics, balance) done 2–3× per week. The best-studied program in youth soccer.',
  evidence:
    'Teams that adopt neuromuscular programs like FIFA 11+ see roughly 30–50% fewer injuries overall and about a 53% reduction in ACL injuries.',
};

export const preventionChecklist: PreventionStep[] = [
  {
    title: 'Do a neuromuscular warm-up (FIFA 11+) 2–3×/week',
    detail: 'This is the single highest-impact thing a youth team can do to cut injuries.',
  },
  {
    title: 'Train cutting, landing & deceleration technique',
    detail: 'Most ACL tears are non-contact. Teaching soft, knee-aligned landings pays off.',
  },
  {
    title: 'Manage load — watch sudden spikes',
    detail: 'Most overuse injuries follow a jump in volume. Build minutes gradually; rest matters.',
  },
  {
    title: 'Strengthen hamstrings, hips & calves',
    detail: 'Posterior-chain and hip strength protects knees and ankles.',
  },
  {
    title: 'Respect growth-spurt years',
    detail: "During rapid growth, heels (Sever's) and knees (Osgood-Schlatter) are vulnerable — ease load.",
  },
  {
    title: 'Get the footwear & support right',
    detail:
      'A supportive insole with the correct arch profile improves stability and cushioning and helps with heel, arch and ankle issues.',
  },
  {
    title: 'Hydrate, sleep, and never "play through" sharp pain',
    detail: 'Fatigue late in matches is when many injuries happen. Recovery is training.',
  },
];
