// Approximate (city-level) coordinates for each club in the directory, used by
// the "near you" map + nearest-club finder. Keyed by the club's exact `name`
// in clubs.ts. City centroids are close enough for "which clubs are nearest";
// swap in exact field coordinates if you want pinpoint accuracy.
export const clubCoords: Record<string, [number, number]> = {
  // South Bay
  'San Jose Earthquakes Academy': [37.3382, -121.8863],
  'De Anza Force': [37.323, -122.0322],
  'Bay Area Surf': [37.3541, -121.9552],
  'MVLA Soccer Club': [37.3861, -122.0839],
  'Santa Clara Sporting': [37.3541, -121.9552],
  'Los Gatos United': [37.2358, -121.9624],
  'Juventus SC': [37.32, -121.82],
  'Quicksilver SC': [37.3, -121.85],
  'Almaden FC': [37.24, -121.87],
  'West Valley Youth Soccer': [37.29, -121.97],
  'Silicon Valley Soccer Academy': [37.37, -121.97],
  'Cupertino FC': [37.323, -122.0322],
  // Peninsula & SF
  'SF Glens': [37.7749, -122.4194],
  'SF Elite SC': [37.76, -122.44],
  'Peninsula Youth Soccer Club': [37.563, -122.3255],
  'JASA (Redwood City)': [37.4852, -122.2364],
  'East Palo Alto United SC': [37.4688, -122.1411],
  'Palo Alto SC': [37.4419, -122.143],
  // East Bay
  'Mustang SC': [37.8216, -121.9999],
  'San Ramon FC': [37.7799, -121.978],
  'Ballistic United SC (BUSC)': [37.6624, -121.8747],
  'Livermore Fusion SC': [37.6819, -121.768],
  'Pleasanton RAGE': [37.6604, -121.8835],
  'Bay Oaks SC': [37.8044, -122.2712],
  'Lamorinda SC': [37.8349, -122.1297],
  'Diablo FC': [37.978, -122.0311],
  'Walnut Creek SC': [37.9101, -122.0652],
  'Dublin United SC': [37.7022, -121.9358],
  'Fremont Rush SC': [37.5485, -121.9886],
  // North Bay
  'Marin FC': [37.9735, -122.5311],
  'Santa Rosa United': [38.4404, -122.7141],
  'North Coast FC': [38.43, -122.72],
  'AC Marin': [38.1074, -122.5697],
  'North Marin United': [38.1, -122.57],
  'Napa United SC': [38.2975, -122.2869],
  // Sacramento & Foothills
  'San Juan Soccer Club': [38.62, -121.33],
  'Placer United': [38.7521, -121.288],
  'Davis Legacy': [38.5449, -121.7405],
  'Sacramento United': [38.5816, -121.4944],
  'Sacramento Republic FC Youth': [38.5816, -121.4944],
  'Legends SC': [38.56, -121.42],
  'Natomas United YSL': [38.65, -121.52],
  'West Sacramento SC': [38.5805, -121.5302],
  // Central Valley
  'River Islands FC': [37.8227, -121.2766],
  'Stockton TLJ FC': [37.9577, -121.2908],
  'West Coast Soccer Club': [37.7397, -121.4252],
  'Turlock PSG': [37.4947, -120.8466],
  'Modesto Ajax': [37.6391, -120.9969],
  'Madera United FC': [36.9613, -120.0607],
  // Central Coast
  'Santa Cruz United FC (Breakers)': [36.9741, -122.0308],
  'Monterey Condors Club': [36.6002, -121.8947],
  'Hollister Tremors YSL': [36.8525, -121.4017],
  // Far North & Sierra
  'Sierra United SC': [39.2191, -121.0611],
  'North Valley YSL': [39.7285, -121.8375],
  'Northern Nevada SC': [39.5296, -119.8138],
};

// City-level coordinates for the GIRLS directory clubs (data/girls.ts
// girlsDirectoryClubs), keyed by their exact `name`. Used by the girls map.
export const girlsClubCoords: Record<string, [number, number]> = {
  // ECNL Girls
  MVLA: [37.3861, -122.0839],
  'De Anza Force': [37.323, -122.0322],
  'Bay Area Surf': [37.3541, -121.9552],
  'Mustang SC': [37.8216, -121.9999],
  'Pleasanton RAGE': [37.6604, -121.8835],
  'Marin FC': [37.9735, -122.5311],
  'Santa Rosa United': [38.4404, -122.7141],
  'San Juan SC': [38.62, -121.33],
  'Davis Legacy': [38.5449, -121.7405],
  'Placer United': [38.7521, -121.288],
  'California Odyssey': [36.8252, -119.7029],
  // Girls Academy
  'Sacramento United': [38.5816, -121.4944],
  'FC Bay Area Surf': [37.3541, -121.9552],
  // DPL
  'Dublin United (DUFC)': [37.7022, -121.9358],
  // ECRL Girls
  'Santa Clara Sporting': [37.3541, -121.9552],
  'Los Gatos United': [37.2358, -121.9624],
  'San Ramon FC (SRFC)': [37.7799, -121.978],
  'Walnut Creek Surf SC': [37.9101, -122.0652],
  'Diablo Valley FC': [37.978, -122.0311],
  'Eastshore Alliance FC': [37.9, -122.3],
  'Livermore Fusion FC': [37.6819, -121.768],
  'California Magic SC': [37.978, -122.0311],
  'San Francisco Elite Academy': [37.7749, -122.4194],
  'SF United': [37.7749, -122.4194],
  'Stanford Strikers FC': [37.4419, -122.143],
  'Burlingame SC': [37.5841, -122.3661],
  'Folsom Lake Surf': [38.678, -121.176],
  'Revolution FC': [38.6, -121.3],
  'Association FC': [38.65, -121.3],
  'Solano Surf': [38.2494, -122.0405],
  'North Coast FC': [38.43, -122.72],
  'Napa United': [38.2975, -122.2869],
  'West Coast Soccer': [37.7397, -121.4252],
  'Stanislaus United': [37.6391, -120.9969],
  'Valley Surf': [37.6688, -121.0],
};
