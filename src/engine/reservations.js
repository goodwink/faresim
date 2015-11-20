const fares = {
  J: [{code: 'J', price: 3.0}, {code: 'Z', price: 2.0}],
  W: [{code: 'W', price: 1.5}, {code: 'S', price: 1.25}],
  Y: [{code: 'Y', price: 1.0}, {code: 'V', price: 0.5}]
};

export default class ReservationManager {
  constructor(flights, equipment) {
    this.inventory = flights.map((f) => Object.assign({}, f));
    this.bookings = [];

    let initialFares = function (flight, cabin) {
      let cabinFares = fares[cabin.id];
      let perBucket = Math.round(cabin.seats / cabinFares.length);
      let totalAssigned = 0;

      return cabinFares.map(function (initCf, index) {
        let cf = Object.assign({}, initCf);

        if (index === cabinFares.length - 1) {
          cf.available = cabin.seats - totalAssigned;
        } else {
          cf.available = perBucket;
          totalAssigned = totalAssigned + perBucket;
        }

        return cf;
      });
    };

    this.inventory.forEach(function (flight) {
      flight.equipment = JSON.parse(JSON.stringify(equipment[flight.equipment]));
      flight.fares = {};

      flight.equipment.cabins.forEach(function (cabin) {
        flight.fares[cabin.id] = initialFares(flight, cabin);
      });
    });
  }

  quoteFare(flightNumber, cabinClass) {
    let flight = this.inventory.find((flight) => flight.id === flightNumber);

    return flight.fares[cabinClass].map(function (f) {
      let fare = Object.assign({}, f);
      fare.price = f.price * flight.baseFare;

      return fare;
    });
  }

  buyFare(flightNumber, cabinClass, fareCode) {
    let flight = this.inventory.find((flight) => flight.id === flightNumber);
    let fares = flight.fares[cabinClass];
    let fare = fares.find((fare) => fare.code === fareCode);
    let cabin = flight.equipment.cabins.find(c => c.id === cabinClass);

    if (!fare || fare.available === 0) return false;

    let row = flight.equipment.seatmap.rows.find(function (row) {
      if (row.id < cabin.rowStart || row.id > cabin.rowEnd)
        return false;
      else
        return row.seats.find((seat) => !seat.occupied);
    });

    if (!row) return false;

    let seat = row.seats.find((seat) => !seat.occupied);

    if (!seat) return false;

    let booking = {
      flight: flightNumber,
      cabinName: cabin.cabinName,
      fareClass: fare.code,
      revenue: fare.price * flight.baseFare,
      row: row.id,
      seat: seat.id
    };

    this.bookings.push(booking);

    seat.occupied = true;

    fare.available = fare.available - 1;

    return booking;
  }
}
