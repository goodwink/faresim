export function quoteFare(flightNumber, cabinClass) {
  return {
    type: 'QUOTE_FARE',
    flightNumber: flightNumber,
    cabinClass: cabinClass
  };
}

export function buyFare(flightNumber, cabinClass, fareCode) {
  return {
    type: 'BUY_FARE',
    flightNumber: flightNumber,
    cabinClass: cabinClass,
    fareCode: fareCode
  };
}
