import React from "react";

import { Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Log_in from "./components/Log_in";
import Sign_up from "./components/Sign_up";
import Profile from "./components/Profile";


export default (
  	<Switch>
    	<Route exact path="/" component={Home} />
        <Route path="/log_in" component={Log_in} />
        <Route path="/sign_up" component={Sign_up} />
        <Route path="/profile" component={Profile} />
    </Switch>
);