import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import OfficeCard from "./OfficeCard";
import OfficeCompany from "./OfficeCompany";

class OfficeDashboard extends Component {
  onDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      const { firestore } = this.props;
      firestore.delete({ collection: "office", doc: id });
    } else {
      return;
    }
  };

  render() {
    let { companies, office } = this.props;

    if (companies && office) {
      return (
        <div className="container border rounded my-4 p-3">
          {companies ? <OfficeCompany companies={companies} /> : null}
          <div className="pt-3">
            <h1>Offices</h1>
            <div className="row">
              {office.length === 0 ? (
                <div className="mx-auto my-4">
                  <h6>There is no offices created yet</h6>
                </div>
              ) : (
                office.map((off) => (
                  <OfficeCard off={off} onDelete={this.onDelete} key={off.id} />
                ))
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return <h4>Loading</h4>;
    }
  }
}

OfficeDashboard.propTypes = {
  firestore: PropTypes.object.isRequired,
  office: PropTypes.array,
  companies: PropTypes.object,
};

export default compose(
  firestoreConnect((props) => [
    {
      collection: "office",
      where: [["company", "==", props.match.params.name]],
    },
    {
      collection: "companies",
      where: [["name", "==", props.match.params.name]],
    },
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    office: ordered.office,
    companies: ordered.companies && ordered.companies[0],
  }))
)(OfficeDashboard);
