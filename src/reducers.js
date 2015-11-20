import B76D from './equipment/76D.js';
import ReservationManager from './engine/reservations.js';

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
  customers: [],
  bookings: [],
  equipment: {
    "76D": B76D
  }
};

const reservationManager = new ReservationManager(initialState.flights, initialState.equipment);

function flightSim(state = initialState, action) {
  let newState = Object.assign({}, state);

  switch (action.type) {
    case 'QUOTE_FARE':
      newState.booking = null;
      newState.quote = {
        flightNumber: action.flightNumber,
        cabinClass: action.cabinClass,
        result: reservationManager.quoteFare(action.flightNumber, action.cabinClass)
      };

      return newState;
    case 'BUY_FARE':
      newState.quote = null;
      newState.booking = reservationManager.buyFare(action.flightNumber, action.cabinClass, action.fareCode);

      newState.bookings = state.bookings.slice(0);
      newState.bookings.push(newState.booking);

      return newState;
    default:
      return state;
  }
};

export default flightSim;
