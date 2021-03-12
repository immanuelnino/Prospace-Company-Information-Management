import React, { Component } from "react";
import { Link } from "react-router-dom";

class CompanyCard extends Component {
  render() {
    const { company, onDelete } = this.props;
    return (
      <div className="col-6 ">
        <div className="card text-dark rounded p-3 my-2">
          <h4 className="border-bottom">
            {company.name}{" "}
            <span
              className="float-right clickable"
              onClick={onDelete.bind(this, company.id, company.name)}
            >
              <i className="fas fa-times"></i>
            </span>
          </h4>
          <Link
            to={`/${company.name}`}
            className="text-decoration-none text-dark"
          >
            <h6>Address:</h6>
            <p> {company.address}</p>
            <h6>Revenue:</h6>
            <p> {company.revenue}</p>
            <h6>Phone No:</h6>
            <p>
              {"("}
              {company.phone_code}
              {")"} {company.phone_no}
            </p>
          </Link>
        </div>
      </div>
    );
  }
}

export default CompanyCard;
