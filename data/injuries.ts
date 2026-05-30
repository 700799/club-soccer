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

// WHY youth soccer injuries happen — the mechanisms, with the research behind them.
export interface InjuryCause {
  title: string;
  detail: string;
}

export const whyInjuriesHappen: InjuryCause[] = [
  {
    title: 'Growth spurts outpace muscle & coordination',
    detail:
      'During rapid growth, bones lengthen faster than muscles and tendons can keep up, creating temporary imbalances, longer "levers" at the knee, and a dip in coordination. That fast-growing, not-yet-filled-out teen is at higher risk than same-age peers — which is why heel (Sever\'s) and knee (Osgood-Schlatter) issues spike in growth years.',
  },
  {
    title: 'Most ACL tears are non-contact',
    detail:
      'They usually happen on cutting, decelerating or landing — when the body isn\'t positioned to absorb the force — not from a tackle. The knee collapses inward (valgus) and the ligament fails. Because it\'s non-contact, technique and strength training can meaningfully lower the risk.',
  },
  {
    title: 'Overuse & year-round training (fatigue failure)',
    detail:
      'Early specialization and playing one sport year-round pile up training load with too little rest. Many non-contact injuries are essentially "fatigue failure" from accumulated volume — tired muscles stop protecting joints, and overused tissues break down (stress fractures, tendinopathy).',
  },
  {
    title: 'Underdeveloped neuromuscular control',
    detail:
      'Young athletes are still building the brain-to-muscle control that keeps movement safe and efficient. Poor landing/cutting mechanics — knees caving in, stiff landings — drive injury. This is exactly what neuromuscular warm-ups (like FIFA 11+) retrain, and why they work.',
  },
  {
    title: 'Why girls are at higher ACL risk',
    detail:
      'After puberty, differences in hip/knee alignment, muscle activation patterns, ligament laxity and landing mechanics combine to make non-contact ACL tears 4–6× more common in girls than boys — which is why prevention programs matter even more for female players.',
  },
  {
    title: 'Fatigue late in matches',
    detail:
      'A large share of injuries occur in the final third of games and practices, when players are tired. Conditioning, substitutions and load management directly reduce that end-of-game risk.',
  },
];

// Explicit, clickable sources for the stats on this page.
export interface InjurySource {
  label: string;
  url: string;
}

export const injurySources: InjurySource[] = [
  {
    label:
      'Injury incidence & risk factors in youth soccer — systematic review (PMC)',
    url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9806741/',
  },
  {
    label:
      'ACL incidence in youth & male soccer: 17,108 players, age sub-analysis',
    url: 'https://www.researchgate.net/publication/368475757',
  },
  {
    label: 'ACL injuries in the prepubescent & adolescent athlete (PMC)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2938325/',
  },
  {
    label:
      'Overuse non-contact ACL injury in young athletes — prevention (PMC)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9950994/',
  },
  {
    label: 'Lateral ankle sprain epidemiology in soccer (ScienceDirect)',
    url: 'https://www.sciencedirect.com/science/article/abs/pii/S0020138324004054',
  },
  {
    label: 'Maturation & knee biomechanics in young female players (PMC)',
    url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7250454/',
  },
  {
    label:
      'Sokolove, M. — "Warrior Girls: Protecting Our Daughters Against the Injury Epidemic in Women\'s Sports" (Simon & Schuster, 2008)',
    url: 'https://www.goodreads.com/book/show/3327089-warrior-girls',
  },
];

// A deeper, book-informed treatment of WHY girls in particular get hurt, drawing
// on Michael Sokolove's "Warrior Girls." All wording below is our own paraphrase
// /summary of the book's reporting and arguments (not quotations) — see the
// citation block in the UI. These are the book's central, widely-cited themes.
export interface WarriorGirlsTheme {
  title: string;
  detail: string;
}

export const warriorGirlsIntro =
  'Journalist Michael Sokolove\'s 2008 book "Warrior Girls: Protecting Our Daughters Against the Injury Epidemic in Women\'s Sports" reported on a wave of serious injuries — especially ACL tears — among girls and young women in the Title IX era. Soccer sits at the center of his reporting. His core argument: this is not a reason to hold girls back, but a reason to train smarter, diversify, and demand prevention. The themes below are our summary of his reporting; the stats are corroborated by the peer-reviewed sources listed above.';

export const warriorGirlsThemes: WarriorGirlsTheme[] = [
  {
    title: 'A real injury epidemic — not a knock on female athletes',
    detail:
      'Sokolove documents that as girls\' participation exploded after Title IX, so did a wave of injuries. His point is the opposite of "girls are fragile": the gains are wonderful and worth protecting — which is exactly why the injury problem deserves honest attention instead of being swept aside out of fear it will be used against women\'s sports.',
  },
  {
    title: 'The ACL gap is stark',
    detail:
      'The book popularized how dramatically female athletes tear ACLs more often than males in the same sports — by some measures several times the rate. Soccer and basketball, with their cutting and landing, are the highest-risk sports. This is the single most cited takeaway of the book.',
  },
  {
    title: 'Why girls\' knees are different',
    detail:
      'Sokolove walks through the biomechanical and hormonal factors researchers point to: wider hips changing knee angles, a tendency to land more upright and "knock-kneed," quadriceps-dominant landing that leaves the hamstrings underused, greater ligament laxity, and the effects of the menstrual cycle. None of these doom a player — but together they raise risk if movement isn\'t trained.',
  },
  {
    title: 'Year-round, single-sport specialization is the accelerant',
    detail:
      'A central villain in the book is the modern youth-sports culture that pushes kids — often by age 10 — to pick one sport and play it all year, on multiple teams, with no off-season. Sokolove ties this overuse and lack of recovery directly to the injury epidemic. Multi-sport athletes and real rest are protective.',
  },
  {
    title: 'Concussions are part of the story too',
    detail:
      'The book highlights research that female soccer players sustain concussions at rates rivaling other collision sports — a then-underappreciated risk that has since driven heading limits for young players and better concussion protocols.',
  },
  {
    title: 'The fix exists — and parents must demand it',
    detail:
      'Sokolove is ultimately hopeful: structured neuromuscular training (the lineage that became programs like FIFA 11+/PEP) measurably cuts ACL injuries. He argues parents and clubs should insist on prevention warm-ups, sane schedules, multi-sport play and rest — changing a culture that, as he puts it, "manufactures" injuries.',
  },
];

// Concrete, parent-facing actions distilled from the book + sports-medicine
// consensus. Pairs with the FIFA 11+ checklist already on the page.
export const warriorGirlsTakeaways: string[] = [
  'Do a proven prevention warm-up (FIFA 11+ / PEP) every session — it specifically retrains the landing and cutting mechanics behind most ACL tears.',
  'Play more than one sport, especially before the mid-teens — varied movement builds resilience and avoids repetitive overload.',
  'Insist on a real off-season and rest days; fatigue and year-round load are when injuries cluster.',
  'Build hamstring and hip strength to balance quad-dominant landing.',
  'Take concussions seriously: respect heading guidelines for young players and never "play through" a head knock.',
  'Don\'t accept "she\'s just injury-prone." Ask your club what prevention program they run — and push for one if they don\'t.',
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
      'Heel-growth-plate irritation in younger players — a leading cause of heel pain. Managed with rest, calf stretching and cushioned heel support.',
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
      'Overuse irritation of the band along the bottom of the foot, aggravated by flat, unsupportive footwear and spikes in training load. Arch support and load management help.',
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
      'Well-fitting cleats with the right support improve stability and cushioning and help with heel, arch and ankle issues. (See the dedicated footwear section for how to choose.)',
  },
  {
    title: 'Hydrate, sleep, and never "play through" sharp pain',
    detail: 'Fatigue late in matches is when many injuries happen. Recovery is training.',
  },
];
