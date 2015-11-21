import React, { Component } from 'react';
import { Panel, Input, Button } from 'react-bootstrap';

import Quote from '../components/Quote.jsx';

export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {flight: null, cabins: []};
  }

  handleFlightChange() {
    let flight = this.props.flights.find(flight => flight.id === this.refs.flight.getValue());
    let cabins = this.props.equipment[flight.equipment].cabins;

    this.setState({
      flight: flight,
      cabins: cabins
    });
  }

  quoteFareClick() {
    this.props.quoteFare(this.refs.flight.getValue(), this.refs.cabin.getValue());
  }

  componentDidMount() {
    let flight = this.props.flights.find(flight => flight.id === this.refs.flight.getValue());
    let cabins = this.props.equipment[flight.equipment].cabins;

    this.setState({
      flight: flight,
      cabins: cabins
    });
  }

  render() {
    return (
      <Panel header="Manual Booking">
        <form>
          <Input type="select" label="Flight" onChange={e => this.handleFlightChange(e)} ref="flight">
            {this.props.flights.map((flight) => (
              <option value={flight.id} key={flight.id}>{flight.id}: {flight.origin} > {flight.destination}</option>
            ))}
          </Input>
          <Input type="select" label="Cabin" ref="cabin">
            {this.state.cabins && this.state.cabins.map((cabin) => (
              <option value={cabin.id} key={cabin.id}>{cabin.cabinName}</option>
            ))}
          </Input>
          <Button onClick={e => this.quoteFareClick(e)}>Quote Fare</Button>
          <Quote quote={this.props.quote} buyFare={this.props.buyFare}/>
        </form>
      </Panel>
    );
  }
}
