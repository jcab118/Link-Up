import React from "react";

import { Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Log_in from "./components/Log_in";
import Sign_up from "./components/Sign_up";
import Profile from "./components/Profile";
import Link_up from "./components/Link_up";
import Friends from "./components/Friends";
import Sign_out from "./components/Sign_out";


export default (
  	<Switch>
    	<Route exact path="/" component={Home} />
        <Route path="/log_in" component={Log_in} />
        <Route path="/sign_up" component={Sign_up} />
        <Route path="/profile" component={Profile} />
        <Route path="/Link_up" component={Link_up} />
        <Route path="/Friends" component={Friends} />
        <Route path="/Sign_out" component={Sign_out} />

    </Switch>
);