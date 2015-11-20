import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import accounting from 'accounting';

require('../../style/Quote.css');

export default class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  buyFareClick(fare) {
    this.props.buyFare(
      this.props.quote.flightNumber,
      this.props.quote.cabinClass,
      fare.code);
  }

  render() {
    return (
      <ListGroup className="quoteList">
        {this.props.quote && this.props.quote.result && this.props.quote.result.map(fare => (
          <ListGroupItem key={fare.code} header={accounting.formatMoney(fare.price)}>
            <span>{fare.code}: {fare.available} available</span>
            <Button
              className="pull-right buyButton"
              bsStyle="success"
              onClick={(e) => this.buyFareClick(fare)}>
              Buy
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }
}
