
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import Header from './Header';

class Sign_up extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    }
  }
  signUpForm(e){
    e.preventDefault();
    if(this.refs.confirmPassword.value === this.refs.password.value){
      var newUser = {
        name: this.refs.name.value,
        username: this.refs.username.value,
        email: this.refs.email.value,
        address: this.refs.address.value,
        city: this.refs.city.value,
        state: this.refs.state.value,
        zipCode: this.refs.zipCode.value,
        password: this.refs.password.value
      }
      fetch('/api/sign-up', {
          method: 'post',
          body: JSON.stringify(newUser),
          headers: {
              'content-type': 'application/json',
              'accept': 'application/json'
          },
          credentials: 'same-origin'
      }).then((response) => response.json())
      .then((results) => {
        this.props.history.push("/log_in");
      });
    } else {
      alert("Passwords do not match")
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
            <input className="text-center" type="text" ref="email" /><br></br>
            <label>Username</label><br></br>
            <input className="text-center" type="text" ref="username"/><br></br>
            <label>Street Address</label><br></br>
            <input className="text-center" type="text" ref="address" /><br></br>
            <label>City</label><br></br>
            <input className="text-center" type="text" ref="city" /><br></br>
            <label>State</label><br></br>
            <input className="text-center" type="text" ref="state" /><br></br>
            <label>Zipcode</label><br></br>
            <input className="text-center" type="text" ref="zipCode" /><br></br>
            <label>Password</label><br></br>
            <input className="text-center" type="password" ref="password"/><br></br>
            <label>Confirm Password</label><br></br>
            <input className="text-center" type="password" ref="confirmPassword"/><br></br>
            <input className="btn btn-danger" type="submit" />
          </form>
      </div>
        </div>
    );
  }
};

export default withRouter(Sign_up)