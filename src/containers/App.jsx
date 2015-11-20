import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import FlightList from './FlightList.jsx';
import CustomerList from './CustomerList.jsx';
import Controls from './Controls.jsx';

import { quoteFare, buyFare } from '../actions.js';

class App extends Component {
  render() {
    const dispatch = this.props.dispatch;

    return (
      <Grid fluid={true}>
        <Row>
          <Col sm={6}>
            <FlightList
              flights={this.props.value.flights}
              equipment={this.props.value.equipment}
              bookings={this.props.value.bookings}/>
          </Col>
          <Col sm={6}>
            <Row>
              <Col xs={12}>
                <Controls
                  flights={this.props.value.flights}
                  equipment={this.props.value.equipment}
                  quoteFare={(flightNumber, cabinClass) => dispatch(quoteFare(flightNumber, cabinClass))}
                  quote={this.props.value.quote}
                  buyFare={(flightNumber, cabinClass, fareCode) => dispatch(buyFare(flightNumber, cabinClass, fareCode))}
                  booking={this.props.value.booking}/>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <CustomerList customers={this.props.value.customers}/>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    value: state
  };
}

export default connect(mapStateToProps)(App);
