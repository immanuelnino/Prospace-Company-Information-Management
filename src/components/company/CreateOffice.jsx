import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { toast } from "react-toastify";
import classnames from "classnames";

class CreateOffice extends Component {
  state = {
    name: "",
    latitude: "",
    longitude: "",
    start_date: "",
    company: "",
    errors: {},
  };

  initialState = {
    name: "",
    latitude: "",
    longitude: "",
    start_date: "",
    company: "",
    errors: {},
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { name, latitude, longitude, start_date, company } = this.state;

    // Check For Errors
    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }

    if (latitude === "") {
      this.setState({ errors: { latitude: "Latitude is required" } });
      return;
    }

    if (longitude === "") {
      this.setState({ errors: { longitude: "Longitude is required" } });
      return;
    }

    if (start_date === "") {
      this.setState({ errors: { start_date: "Start datae code is required" } });
      return;
    }

    if (company === "") {
      this.setState({ errors: { company: "Company is required" } });
      return;
    }

    const newOffice = this.state;
    const { firestore } = this.props;
    firestore.add({ collection: "office" }, newOffice);
    toast.success("Office successfully created");
    this.setState(this.initialState);
  };

  render() {
    const { companies } = this.props;
    const { errors } = this.state;

    return (
      <div className="col-6">
        <h2>Create Office</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              onChange={this.onChange}
              value={this.state.name}
              className={classnames("form-control", {
                "is-invalid": errors.name,
              })}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="form-group">
            <label>Location:</label>
            <div className="form-row">
              <div className="col">
                <input
                  type="number"
                  name="latitude"
                  onChange={this.onChange}
                  value={this.state.latitude}
                  className={classnames("form-control", {
                    "is-invalid": errors.latitude,
                  })}
                />
                {errors.latitude && (
                  <div className="invalid-feedback">{errors.latitude}</div>
                )}
              </div>
              <div className="col">
                <input
                  type="number"
                  name="longitude"
                  onChange={this.onChange}
                  value={this.state.longitude}
                  className={classnames("form-control", {
                    "is-invalid": errors.longitude,
                  })}
                />
                {errors.longitude && (
                  <div className="invalid-feedback">{errors.longitude}</div>
                )}
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Office Start Date:</label>
            <input
              type="date"
              name="start_date"
              onChange={this.onChange}
              value={this.state.start_date}
              className={classnames("form-control", {
                "is-invalid": errors.start_date,
              })}
            />
            {errors.start_date && (
              <div className="invalid-feedback">{errors.start_date}</div>
            )}
          </div>
          <div className="form-group">
            <label>Company:</label>
            <select
              name="company"
              onChange={this.onChange}
              className={classnames("form-control", {
                "is-invalid": errors.company,
              })}
              value={this.state.company}
            >
              <option value="">Choose Company</option>
              {companies
                ? companies.map((company) => (
                    <option value={company.name} key={company.id}>
                      {company.name}
                    </option>
                  ))
                : null}
            </select>
            {errors.company && (
              <div className="invalid-feedback">{errors.company}</div>
            )}
            {/* <input
              type="text"
              className="form-control"
              name="company"
              onChange={this.onChange}
              value={this.state.company}
            /> */}
          </div>
          <button
            type="submit"
            value="Submit"
            className="btn btn-secondary w-100"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

CreateOffice.propTypes = {
  firestore: PropTypes.object.isRequired,
  companies: PropTypes.array,
};
export default compose(
  firestoreConnect([{ collection: "companies" }]),
  connect((state, props) => ({
    companies: state.firestore.ordered.companies,
  }))
)(CreateOffice);
