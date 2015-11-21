import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import Griddle from 'griddle-react';

import { BookingNameCell, BookingFlightCell, BookingSeatsCell, BookingRevenueCell } from '../components/customer.jsx';

export default class CustomerList extends Component {
  render() {
    let columns = [
      {
        "columnName": "name",
        "displayName": "Name",
        "customComponent": BookingNameCell
      },
      {
        "columnName": "partySize",
        "displayName": "Party"
      },
      {
        "columnName": "location",
        "displayName": "Origin"
      },
      {
        "columnName": "flight",
        "displayName": "Flight",
        "customComponent": BookingFlightCell
      },
      {
        "columnName": "seats",
        "displayName": "Seats",
        "customComponent": BookingSeatsCell
      },
      {
        "columnName": "revenue",
        "displayName": "Revenue",
        "customComponent": BookingRevenueCell
      }
    ];

    return (
      <Panel header="Customer List">
        <Griddle
          results={this.props.customers}
          columnMetadata={columns}
          columns={['name', 'partySize', 'location', 'flight', 'seats', 'revenue']}
          resultsPerPage={50}/>
      </Panel>
    );
  }
}
