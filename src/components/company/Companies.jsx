import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import CompanyCard from "./CompanyCard";

class Companies extends Component {
  onDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      const { firestore } = this.props;
      firestore.delete({ collection: "companies", doc: id });
    } else {
      return;
    }
  };
  render() {
    const { companies } = this.props;
    return (
      <div className="pt-3">
        <h1>Companies</h1>
        {companies.length === 0 ? (
          <div className="mx-auto my-3">
            <h6>There is no companies created yet</h6>
          </div>
        ) : (
          <div className="row">
            {companies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onDelete={this.onDelete}
              />
            ))}
          </div>
        )}
      </div>
      // </div>
    );
  }
}

Companies.propTypes = {
  firestore: PropTypes.object.isRequired,
  companies: PropTypes.array,
};

export default compose(
  firestoreConnect([{ collection: "companies" }]),
  connect((state, props) => ({
    companies: state.firestore.ordered.companies,
  }))
)(Companies);
