import React, { Component } from "react";
import { Link } from "react-router-dom";

class OfficeCompany extends Component {
  render() {
    const { companies } = this.props;
    return (
      <div className="border-bottom pb-4">
        <h3 className="border-bottom">{companies.name}</h3>
        <h5>Address:</h5>
        <p> {companies.address}</p>
        <h5>Revenue:</h5>
        <p> {companies.revenue}</p>
        <div className="row align-items-end">
          <div className="col">
            <h5>Phone No:</h5>
            <p>
              {"("}
              {companies.phone_code}
              {")"} {companies.phone_no}
            </p>
          </div>
          <div className="col text-right">
            <Link to="/">
              <button className="btn btn-secondary">Back to Overview</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default OfficeCompany;
