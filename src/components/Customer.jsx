import React, { Component } from 'react';
import accounting from 'accounting';

export class BookingNameCell extends Component {
  render() {
    let formatName = function (name) {
      let parts = name.split(" ");

      return parts[parts.length - 1].substring(0, 3).toUpperCase() + "/" + name.charAt(0);
    };

    return <span>{formatName(this.props.data)}</span>;
  }
}

export class BookingFlightCell extends Component {
  render() {
    return <span>{this.props.rowData.booking && this.props.rowData.booking[0].flight}</span>;
  }
}

export class BookingSeatsCell extends Component {
  render() {
    let formatSeats = function (booking) {
      return booking.map(b => b.row + b.seat + ' ');
    }

    return <span>{this.props.rowData.booking && formatSeats(this.props.rowData.booking)}</span>;
  }
}

export class BookingRevenueCell extends Component {
  render() {
    return (
      <span>
        {this.props.rowData.booking &&
          accounting.formatMoney(
            this.props.rowData.booking.reduce((total, b) => total = total + b.revenue, 0))}
      </span>
    );
  }
}
