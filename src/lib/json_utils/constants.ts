export const SAMPLE_JSON_DATA = {
  supermarket: {
    name: 'Fresh Valley Market',
    address: {
      street: '123 Greenway Blvd',
      city: 'Sunnyvale',
      state: 'CA',
      zip: '94086',
    },
    inventory: [
      {
        item: 'Apple',
        variety: 'Honeycrisp',
        price_per_lb: 2.99,
        quantity_lbs: 120,
      },
      {
        item: 'Orange',
        variety: 'Navel',
        price_per_lb: 1.49,
        quantity_lbs: 200,
      },
    ],
    open_hours: {
      monday_friday: '8:00 AM - 9:00 PM',
      saturday: '9:00 AM - 8:00 PM',
      sunday: '10:00 AM - 6:00 PM',
    },
  },
};
