import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import Seat from './Seat.jsx';

require('../../style/PlaneRow.css');

export default class PlaneRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let seatsPerRow = this.props.row.seats.length;
    let numAisles = this.props.row.seats.filter((seat) => seat.type.find((type) => type === 'aisle-left')).length;
    let seatWidth = (175 - (numAisles * 8)) / seatsPerRow;
    let seatHeight = Math.min(seatWidth * 0.85, 25);

    let rowStyle = {
      height: Math.min((this.props.cabin.pitch / 31) * 25, 45) + "px"
    };

    let cabinColor = "#2FCC5F";

    if (this.props.cabin.id === 'J')
      cabinColor = "#5281D4";
    else if (this.props.cabin.id == 'W')
      cabinColor = "#8FE1F4";

    return (
      <Row>
        <Col xs={2} className="rowNumber">
          {this.props.row.id}
        </Col>
        <Col xs={10} className="planeRow" style={rowStyle}>
          {this.props.row && this.props.row.seats.map((seat) => (
            <Seat seat={seat} key={seat.id} seatWidth={seatWidth} seatHeight={seatHeight} aisleWidth={12} cabinColor={cabinColor} occupied={this.props.manifest.find((booking) => booking.seat === seat.id)}/>
          ))}
        </Col>
      </Row>
    );
  }
}
