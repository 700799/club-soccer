// Shared section definitions used by the floating menu, the header and the footer.
export interface NavSection {
  id: string;
  label: string;
  short: string;
  icon: string;
}

export const sections: NavSection[] = [
  { id: 'top', label: 'Home', short: 'Home', icon: '⚽' },
  { id: 'levels', label: 'Levels of Soccer', short: 'Levels', icon: '🪜' },
  { id: 'girls', label: 'Girls Pathway', short: 'Girls', icon: '👧' },
  { id: 'costs', label: 'Costs & Expectations', short: 'Costs', icon: '💵' },
  { id: 'standings', label: 'Standings & Records', short: 'Standings', icon: '📊' },
  { id: 'near', label: 'Clubs Near You', short: 'Near You', icon: '📍' },
  { id: 'injuries', label: 'Injuries & Prevention', short: 'Injuries', icon: '🩹' },
  { id: 'insoles', label: 'Find Your Insole', short: 'Insoles', icon: '👟' },
  { id: 'news', label: 'Latest News', short: 'News', icon: '📰' },
];
