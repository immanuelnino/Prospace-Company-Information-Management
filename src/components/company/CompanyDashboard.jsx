import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Companies from "./Companies";
import CreateCompany from "./CreateCompany";
import CreateOffice from "./CreateOffice";

class CompanyDashboard extends Component {
  render() {
    const { companies } = this.props;

    return (
      <div className="container border rounded my-4 p-5">
        <div className="row border-bottom pb-4">
          <CreateCompany />
          <CreateOffice />
        </div>
        {companies ? <Companies companies={companies} /> : null}

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

CompanyDashboard.propTypes = {
  firestore: PropTypes.object.isRequired,
  companies: PropTypes.array,
};

export default compose(
  firestoreConnect([{ collection: "companies" }]),
  connect((state, props) => ({
    companies: state.firestore.ordered.companies,
  }))
)(CompanyDashboard);
