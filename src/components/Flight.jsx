import React, { Component } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import accounting from 'accounting';

import Plane from './Plane.jsx';

require('../../style/Flight.css');

export default class Flight extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let fares = this.props.manifest.reduce(function (obj, booking) {
      if (obj[booking.fareClass]) {
        let fare = obj[booking.fareClass];

        fare.booked = fare.booked + 1;
        fare.revenue = fare.revenue + booking.revenue;
      } else {
        obj[booking.fareClass] = {
          booked: 1,
          revenue: booking.revenue,
          cabinName: booking.cabinName,
          fareClass: booking.fareClass
        };
      }

      return obj;
    }, {});

    return (
      <div>
        <Row>
          <Col xs={12}>
            <Table responsive>
              <thead>
                <tr>
                  <th>Cabin</th>
                  <th>Fare</th>
                  <th>Booked</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(fares).map((fare) => (
                  <tr key={fares[fare].fareClass}>
                    <td>{fares[fare].cabinName}</td>
                    <td>{fares[fare].fareClass}</td>
                    <td>{fares[fare].booked}</td>
                    <td>{accounting.formatMoney(fares[fare].revenue)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td></td>
                  <td>{this.props.manifest.reduce((total, booking) => total = total + 1, 0)}</td>
                  <td>{accounting.formatMoney(this.props.manifest.reduce((total, booking) => total = total + booking.revenue, 0))}</td>
                </tr>
              </tfoot>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Plane equipment={this.props.equipment} manifest={this.props.manifest}/>
          </Col>
        </Row>
      </div>
    );
  }
}
