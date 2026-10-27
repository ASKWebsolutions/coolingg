/**
 * Service-area configuration.
 *
 * status values
 *  - 'hq'        : business location, always accurate
 *  - 'confirmed' : coverage explicitly confirmed by the business
 *  - 'pending'   : area is listed for confirmation — never presented as served
 *
 * Nothing in this file should be marked 'confirmed' until the client approves it.
 */

export const hq = {
  city: 'Millersville',
  state: 'Maryland',
  stateAbbr: 'MD',
  postalCode: '21108',
  line1: '690 Paddle Wheel Ct W',
  line2: 'Millersville, MD 21108',
  country: 'United States',
  label: 'Headquarters',
  note: 'Anne Arundel County, Maryland — the anchor point for ISO Mechanical.',
};

export const states = [
  {
    name: 'Maryland',
    abbr: 'MD',
    status: 'hq',
    cities: ['Millersville'],
    note: 'Business location. Extended coverage is confirmed per request.',
  },
];

export const communities = [
  { name: 'Millersville', status: 'hq' },
  { name: 'Severna Park', status: 'pending' },
  { name: 'Arnold', status: 'pending' },
  { name: 'Annapolis', status: 'pending' },
  { name: 'Gambrills', status: 'pending' },
  { name: 'Odenton', status: 'pending' },
  { name: 'Crofton', status: 'pending' },
  { name: 'Pasadena', status: 'pending' },
  { name: 'Glen Burnie', status: 'pending' },
  { name: 'Linthicum', status: 'pending' },
  { name: 'Severn', status: 'pending' },
  { name: 'Bowie', status: 'pending' },
];

export const coverageNote =
  'Coverage outside our Millersville base is confirmed for each request — tell us your ZIP code and we will let you know.';

export default { hq, states, communities, coverageNote };
