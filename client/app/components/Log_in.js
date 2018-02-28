
import React, { Component } from 'react';
var Link = require("react-router-dom").Link;

import Header from './Sign_out';

export default class Log_in extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    }
  }
    logInForm(e){
        e.preventDefault()
      var signInUser = {
        username: this.refs.username.value,
        password: this.refs.password.value
      }
        fetch('/api/sign-in', {
            method: 'post',
            body: JSON.stringify(signInUser),
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            credentials: 'same-origin'
        }).then((response) => {
            if(response.status == 401){
                alert("Login Failed for Username and/or Password")
            } else {
                browserHistory.push("/profile")
            }
        });
    }

    render() {
      return (
         <div className="text-center">
              <h3>Log In</h3>
              <h4>To Start Linking Up</h4>
          <div className="well center-block" id="sign-in-div">
            <form id="log-in-form" onSubmit={this.logInForm.bind(this)}>
              <label>Username</label>
              <input className="text-center" type="text" ref="username"/><br></br>
              <label>Password</label><br></br>
              <input className="text-center" type="password" ref="password"/><br></br>
              <input className="btn btn-danger" type="submit" value="Log In"/>
            </form>
        </div>
          </div>
      );
    }
};