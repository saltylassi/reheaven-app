import React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Home from "../Routes/Home";
import Admin from "../Routes/Admin";
import Result from "../Routes/Result";
import Header from "./Header";

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/admin" exact component={Admin} />
        <Route path="/result" exact component={Result} />
        <Redirect path="*" to="/" />
      </Switch>
    </>
  </Router>
);
