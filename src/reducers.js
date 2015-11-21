import Chance from 'chance';

import B76D from './equipment/76D.js';
import ReservationManager from './engine/reservations.js';

function generateCustomers() {
  let customers = [];
  let chance = new Chance();
  chance.mixin({
    'customer': function () {
      return chance.pick([
        {
          partner: false,
          children: false,
          choiceMethod: 'best',
          budget: chance.natural({min: 3500, max: 6000}),
          location: chance.pick(['ATL', 'LHR']),
          minClass: 'J'
        },
        {
          partner: false,
          children: false,
          choiceMethod: 'best',
          budget: chance.natural({min: 1800, max: 4000}),
          location: chance.pick(['ATL', 'LHR']),
          minClass: 'W'
        },
        {
          partner: true,
          children: false,
          choiceMethod: 'cheapest',
          budget: chance.natural({min: 800, max: 2500}),
          location: chance.pick(['ATL', 'LHR']),
          minClass: 'Y'
        },
        {
          partner: true,
          children: true,
          choiceMethod: 'cheapest',
          budget: chance.natural({min: 700, max: 2200}),
          location: chance.pick(['ATL', 'LHR']),
          minClass: 'Y'
        }
      ])
    }
  });

  for (let i = 0; i <= chance.natural({min: 500, max: 1500}); i++) {
    let customer = chance.customer();

    customer.partySize = 1 + (customer.partner ? 1 : 0) + (customer.children ? chance.natural({min: 1, max: 5}) : 0);
    customer.name = chance.name();
    customer.id = i;
    customers.push(customer);
  }

  return customers;
}

const initialState = {
  flights: [
    {
      id: "ST28",
      origin: "ATL",
      destination: "LHR",
      equipment: "76D",
      baseFare: 2000
    },
    {
      id: "ST29",
      origin: "LHR",
      destination: "ATL",
      equipment: "76D",
      baseFare: 2000
    }
  ],
  customers: generateCustomers(),
  bookings: [],
  equipment: {
    "76D": B76D
  }
};

const reservationManager = new ReservationManager(initialState.flights, initialState.equipment);

function flightSim(state = initialState, action) {
  let newState = Object.assign({}, state);
  let target = action.customer ? newState.customers.find(c => c.id === action.customer) : newState;

  switch (action.type) {
    case 'QUOTE_FARE':
      target.booking = null;
      target.quote = {
        flightNumber: action.flightNumber,
        cabinClass: action.cabinClass,
        result: reservationManager.quoteFare(action.flightNumber, action.cabinClass)
      };

      return newState;
    case 'BUY_FARE':
      target.quote = null;
      target.booking = reservationManager.buyFare(action.flightNumber, action.cabinClass, action.fareCode, action.seats);

      newState.bookings = state.bookings.slice(0);
      target.booking.forEach(b => newState.bookings.push(b));

      return newState;
    default:
      return state;
  }
};

export default flightSim;
