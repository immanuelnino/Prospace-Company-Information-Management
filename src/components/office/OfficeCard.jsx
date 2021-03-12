import React, { Component } from "react";

class OfficeCard extends Component {
  render() {
    const { off, onDelete } = this.props;
    return (
      <div className="col-6">
        <div className="card p-3 my-2">
          <h5 className="border-bottom mb-2">
            {off.name}
            <span
              className="float-right clickable"
              onClick={onDelete.bind(this, off.id, off.name)}
            >
              <i className="fas fa-times"></i>
            </span>
          </h5>

          <h6>Location:</h6>
          <p>Lat = {off.latitude}</p>
          <p>Log = {off.longitude}</p>
          <h6 className="mt-2">Office Start Date:</h6>
          <p>{off.start_date}</p>
        </div>
      </div>
    );
  }
}

export default OfficeCard;
