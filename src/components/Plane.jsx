import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

import PlaneRow from './PlaneRow.jsx';

export default class Plane extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let cabins = this.props.equipment.cabins;
    let manifest = this.props.manifest;

    let cabin = function (row) {
      return cabins.find((cabin) => (
        cabin.rowStart <= row.id && cabin.rowEnd >= row.id
      ));
    }

    let renderRow = function (row) {
      let newCabin = cabins.find((cabin) => cabin.rowStart == row.id);
      let label = "";

      if (newCabin)
        label = newCabin.cabinName;

      return (
        <Col xs={12} key={row.id}>
          <Row>
            <Col xs={12}>
              {label}
            </Col>
          </Row>
          <PlaneRow row={row} cabin={cabin(row)} manifest={manifest.filter((booking) => booking.row === row.id)}/>
        </Col>
      );
    }

    return (
      <Row>
        {this.props.equipment && this.props.equipment.seatmap.rows.map((row) => renderRow(row))}
      </Row>
    );
  }
}
