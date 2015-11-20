import React, { Component } from 'react';
import { Accordion, Panel } from 'react-bootstrap';

import Flight from '../components/Flight.jsx';

export default class FlightList extends Component {
  constructor(props) {
    super(props);
    this.state = {open: null};
  }

  render() {
    let bookings = this.props.bookings;

    let flightHeader = function (flight) {
      return (
        <span>
          <strong>{flight.id}</strong>: {flight.origin} > {flight.destination}
        </span>
      );
    };

    let flightManifest = function (flight) {
      return bookings.filter((booking) => booking.flight === flight.id);
    }

    return (
      <Panel header="Flights">
        <Accordion>
          {this.props.flights && this.props.flights.map((flight) => (
            <Panel key={flight.id} eventKey={flight.id} header={flightHeader(flight)}>
              <Flight equipment={this.props.equipment[flight.equipment]} manifest={flightManifest(flight)}/>
            </Panel>
          ))}
        </Accordion>
      </Panel>
    );
  }
}
