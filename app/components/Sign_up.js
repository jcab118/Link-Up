
import React, { Component } from 'react';
var Link = require("react-router-dom").Link;

import Header from './Header';

export default class Sign_up extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    }
  }
    signUpForm(e){
      e.preventDefault();
      var newUser = {
        name: this.refs.name.value,
        username: this.refs.username.value,
        password: this.refs.password.value
      }
    }

    render() {
      return (
         <div className="text-center">
              <h3>Please Sign Up</h3>
              <h4>So You'll Be Able To Start Linking Up</h4>
              <h4>You'll See The World You've Been Missing Out On</h4>
          <div className="well center-block" id="Sign_up_div">
            <form id="sign-in-form" onSubmit={this.signUpForm.bind(this)}>
              <label>Name</label><br></br>
              <input className="text-center" type="text" ref="name" /><br></br>
              <label>Email</label><br></br>
              <input className="text-center" type="text" ref="Email" /><br></br>
              <label>Username</label><br></br>
              <input className="text-center" type="text" ref="Username"/><br></br>
              <label>Street Address</label><br></br>
              <input className="text-center" type="text" ref="Street Address" /><br></br>
              <label>City</label><br></br>
              <input className="text-center" type="text" ref="City" /><br></br>
              <label>State</label><br></br>
              <input className="text-center" type="text" ref="State" /><br></br>
              <label>Zipcode</label><br></br>
              <input className="text-center" type="text" ref="Zipcode" /><br></br>
              <label>Password</label><br></br>
              <input className="text-center" type="text" ref="password"/><br></br>
              <input className="btn btn-danger" type="submit" />
            </form>
        </div>
          </div>
      );
    }
};