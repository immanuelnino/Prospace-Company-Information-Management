import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

import CompanyDashboard from "./components/company/CompanyDashboard";
import OfficeDashboard from "./components/office/OfficeDashboard";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={CompanyDashboard} />
            <Route exact path="/:name" component={OfficeDashboard} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
