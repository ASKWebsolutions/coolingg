/**
 * Editable HVAC service catalogue.
 *
 * `enabled: false` removes a service from the site entirely.
 * `verified: false` marks a category that still needs confirmation from the business.
 * `tone` drives the wheel accent colour: 'cooling' (blue) | 'heating' (orange) | 'systems' (navy/white).
 * `icon` refers to a Lucide icon name registered in components/ui/iconRegistry.js
 */

export const services = [
  {
    id: 'ac-repair',
    label: 'Air Conditioning Repair',
    shortLabel: 'AC Repair',
    icon: 'Snowflake',
    tone: 'cooling',
    enabled: true,
    verified: false,
    summary:
      'Diagnosing and restoring cooling performance when your system stops keeping up, using a careful, find-the-cause approach.',
    image: 'cooling',
  },
  {
    id: 'ac-installation',
    label: 'AC Installation & Replacement',
    shortLabel: 'AC Install',
    icon: 'AirVent',
    tone: 'cooling',
    enabled: true,
    verified: false,
    summary:
      'Right-sized cooling installation and replacement, planned around the way your space is actually used and loaded.',
    image: 'cooling',
  },
  {
    id: 'heating-repair',
    label: 'Heating Repair',
    shortLabel: 'Heating Repair',
    icon: 'Flame',
    tone: 'heating',
    enabled: true,
    verified: false,
    summary:
      'Troubleshooting and repair for furnaces and heating systems so warmth returns predictably when the season turns.',
    image: 'heating',
  },
  {
    id: 'heating-installation',
    label: 'Heating Installation & Replacement',
    shortLabel: 'Heating Install',
    icon: 'ThermometerSun',
    tone: 'heating',
    enabled: true,
    verified: false,
    summary:
      'Heating installation and replacement with attention to capacity, distribution and long-term serviceability.',
    image: 'heating',
  },
  {
    id: 'heat-pumps',
    label: 'Heat Pump Services',
    shortLabel: 'Heat Pumps',
    icon: 'RefreshCw',
    tone: 'systems',
    enabled: true,
    verified: false,
    summary:
      'Heat pump service, maintenance and replacement for year-round heating and cooling from a single system.',
    image: 'systems',
  },
  {
    id: 'maintenance',
    label: 'Preventive HVAC Maintenance',
    shortLabel: 'Maintenance',
    icon: 'Wrench',
    tone: 'systems',
    enabled: true,
    verified: false,
    summary:
      'Scheduled inspections and tune-ups that catch small issues early and keep systems running as designed.',
    image: 'systems',
  },
  {
    id: 'ductless',
    label: 'Ductless Mini-Split Systems',
    shortLabel: 'Mini-Splits',
    icon: 'Wind',
    tone: 'cooling',
    enabled: true,
    verified: false,
    summary:
      'Ductless heating and cooling for additions, conversions and rooms that need independent comfort control.',
    image: 'cooling',
  },
  {
    id: 'indoor-air-quality',
    label: 'Indoor Air Quality',
    shortLabel: 'Air Quality',
    icon: 'Leaf',
    tone: 'systems',
    enabled: true,
    verified: false,
    summary:
      'Filtration, ventilation and air-quality improvements that support cleaner, more comfortable indoor air.',
    image: 'airflow',
  },
  {
    id: 'duct-cleaning',
    label: 'Air Duct Cleaning',
    shortLabel: 'Duct Cleaning',
    icon: 'Layers',
    tone: 'systems',
    enabled: true,
    verified: false,
    summary:
      'Duct cleaning and airflow assessment to reduce buildup and improve distribution through the system.',
    image: 'airflow',
  },
  {
    id: 'boiler',
    label: 'Boiler Services',
    shortLabel: 'Boilers',
    icon: 'Gauge',
    tone: 'heating',
    enabled: true,
    verified: false,
    summary:
      'Boiler service and replacement for hydronic heating systems, with attention to performance and safety.',
    image: 'heating',
  },
  {
    id: 'water-heater',
    label: 'Water Heater Services',
    shortLabel: 'Water Heaters',
    icon: 'Droplets',
    tone: 'heating',
    enabled: true,
    verified: false,
    summary:
      'Water heater installation, replacement and service for dependable hot water at home.',
    image: 'heating',
  },
  {
    id: 'residential-commercial',
    label: 'Residential & Light Commercial HVAC',
    shortLabel: 'Home & Business',
    icon: 'Building2',
    tone: 'systems',
    enabled: true,
    verified: false,
    summary:
      'Heating and cooling for homes, offices and light commercial spaces, scaled to the building and its schedule.',
    image: 'systems',
  },
];

export const activeServices = services.filter((service) => service.enabled);

export default services;
