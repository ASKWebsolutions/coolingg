/**
 * Equipment-category configuration for the partners section.
 *
 * No manufacturer logos are shown until assets and relationships are confirmed.
 * Categories are neutral and describe the equipment ISO Mechanical works with.
 */

export const partnerCategories = [
  { id: 'heating', label: 'Heating Equipment', hint: 'Furnaces & hydronic systems' },
  { id: 'cooling', label: 'Air Conditioning', hint: 'Central AC & condensers' },
  { id: 'heat-pumps', label: 'Heat Pumps', hint: 'All-electric & hybrid' },
  { id: 'thermostats', label: 'Thermostats', hint: 'Control & zoning' },
  { id: 'iaq', label: 'Indoor Air Quality', hint: 'Filtration & ventilation' },
  { id: 'ductless', label: 'Ductless Systems', hint: 'Mini-split equipment' },
  { id: 'boilers', label: 'Boilers', hint: 'Steam & hot water' },
  { id: 'water-heaters', label: 'Water Heaters', hint: 'Tank & tankless' },
];

export const partnersNote =
  'Equipment brands are confirmed project by project. Ask about the systems you already own.';

export default partnerCategories;
