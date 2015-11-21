export function quoteFare(flightNumber, cabinClass, customer = null) {
  return {
    type: 'QUOTE_FARE',
    flightNumber: flightNumber,
    cabinClass: cabinClass,
    customer: customer
  };
}

export function buyFare(flightNumber, cabinClass, fareCode, customer = null, seats = 1) {
  return {
    type: 'BUY_FARE',
    flightNumber: flightNumber,
    cabinClass: cabinClass,
    fareCode: fareCode,
    customer: customer,
    seats: seats
  };
}
