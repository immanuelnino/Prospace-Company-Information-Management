import React, { Component } from "react";
import PropTypes from "prop-types";
// import { compose } from "redux";
// import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { toast } from "react-toastify";
import classnames from "classnames";

class CreateCompany extends Component {
  state = {
    name: "",
    address: "",
    revenue: "",
    phone_code: "",
    phone_no: "",
    errors: {},
  };

  initialState = {
    name: "",
    address: "",
    revenue: "",
    phone_code: "",
    phone_no: "",
    errors: {},
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, address, revenue, phone_code, phone_no } = this.state;

    // Check For Errors
    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }

    if (address === "") {
      this.setState({ errors: { address: "Address is required" } });
      return;
    }

    if (revenue === "") {
      this.setState({ errors: { revenue: "Revenue is required" } });
      return;
    }

    if (phone_code === "") {
      this.setState({ errors: { phone_code: "Phone code is required" } });
      return;
    }

    if (phone_no === "") {
      this.setState({ errors: { phone_no: "Phone number is required" } });
      return;
    }

    const newCompany = this.state;
    const { firestore } = this.props;
    firestore.add({ collection: "companies" }, newCompany);
    toast.success("Company successfully created");
    this.setState(this.initialState);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="col-6 border-right">
        <h2>Create Company</h2>
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
            <label>Address:</label>
            <input
              type="text"
              name="address"
              onChange={this.onChange}
              value={this.state.address}
              className={classnames("form-control", {
                "is-invalid": errors.address,
              })}
            />
            {errors.address && (
              <div className="invalid-feedback">{errors.address}</div>
            )}
          </div>
          <div className="form-group">
            <label>Revenue:</label>
            <input
              type="number"
              className={classnames("form-control", {
                "is-invalid": errors.revenue,
              })}
              name="revenue"
              onChange={this.onChange}
              value={this.state.revenue}
            />
            {errors.revenue && (
              <div className="invalid-feedback">{errors.revenue}</div>
            )}
          </div>
          <div className="form-group">
            <label>Phone No:</label>
            <div className="form-row">
              <div className="col-3">
                <input
                  type="number"
                  className={classnames("form-control", {
                    "is-invalid": errors.phone_code,
                  })}
                  name="phone_code"
                  onChange={this.onChange}
                  value={this.state.phone_code}
                  min="0"
                />
                {errors.phone_code && (
                  <div className="invalid-feedback">{errors.phone_code}</div>
                )}
              </div>
              <div className="col">
                <input
                  type="number"
                  className={classnames("form-control", {
                    "is-invalid": errors.phone_no,
                  })}
                  name="phone_no"
                  onChange={this.onChange}
                  value={this.state.phone_no}
                  min="0"
                />
                {errors.phone_no && (
                  <div className="invalid-feedback">{errors.phone_no}</div>
                )}
              </div>
            </div>
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

CreateCompany.propTypes = {
  firestore: PropTypes.object.isRequired,
};

export default firestoreConnect()(CreateCompany);
