import React, { Component } from 'react';
import classNames from 'classnames'

require('../../style/Seat.css');

export default class PlaneRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let style = {
      width: this.props.seatWidth,
      height: this.props.seatHeight,
      backgroundColor: this.props.cabinColor
    };

    if (this.props.occupied) {
      style.backgroundColor = "#AAAAAA";
    } else if (this.props.seat.type.find((type) => type === 'blocked')) {
      style.backgroundColor = "#666666";
      style.color = "#666666";
    } else if (this.props.seat.type.find((type) => type === 'none')) {
      style.visibility = 'hidden';
    }

    let aisleLeft = this.props.seat.type.find((type) => type === 'aisle-left');
    let aisleRight = this.props.seat.type.find((type) => type === 'aisle-right');

    if (aisleLeft) {
      style.marginLeft = (this.props.aisleWidth / 2) + "px";
    }

    if (aisleRight) {
      style.marginRight = (this.props.aisleWidth / 2) + "px";
    }

    let classes = classNames(
      'seat',
      {aisleLeft: aisleLeft},
      {aisleRight: aisleRight}
    )
    return (
      <div className="seat" style={style}>{this.props.seat.id}</div>
    );
  }
}
