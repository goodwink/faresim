import Chance from 'chance';
import { quoteFare, buyFare } from '../actions.js';

export default class CustomerBehaviorManager {
  constructor(store) {
    this.chance = new Chance();
    this.store = store;

    let that = this;

    setInterval(function () {
      let customers = that.store.getState().customers;
      that.customerQuote.bind(that)(that.chance.pick(customers))
    }, 1000);
  }

  customerBuy(id) {
    let customer = this.store.getState().customers.find(c => c.id === id);

    if (customer.booking)
      return;

    if (!customer.quote)
      return;

    let lowestFare = customer.quote.result.reduce((lowest, current) => (
      current.price < lowest.price && current.available >= customer.partySize ? current : lowest
    ));

    if (lowestFare && lowestFare.price < customer.budget) {
      this.store.dispatch(buyFare(customer.quote.flightNumber, customer.quote.cabinClass, lowestFare.code, customer.id, customer.partySize));
    }
  }

  customerQuote(customer) {
    if (customer.booking)
      return;

    let flight = this.store.getState().flights.find(f => f.origin === customer.location);
    let that = this;

    let unsubscribe = this.store.subscribe(function () {
      if (customer.quote) {
        that.customerBuy(customer.id);
        unsubscribe();
      }
    });

    this.store.dispatch(quoteFare(flight.id, customer.minClass, customer.id));
  }
}
