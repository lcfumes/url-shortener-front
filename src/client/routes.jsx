import React from "react";
import { Router, Route, Link, browserHistory } from 'react-router'
import Home from "./components/home";
import Redirect from "./components/redirect";

export const routes = (
    <Router>
      <Route path="/" component={Home}></Route>
      <Route path="/r/:hash" component={Redirect}></Route>
    </Router>
);
