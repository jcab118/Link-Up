
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
        email: this.refs.email.value,
        username: this.refs.username.value,
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
         <nav className = "text-center" id="navbar navbar-light bg-faded">
           <Link style={{color:'blue', padding: '5px', textDecoration: 'none'}} to="/">Home</Link>
           <Link style={{color:'blue', padding: '5px', textDecoration: 'none'}} to="/Log_in">Log In</Link>
        </nav>
            <h4>Please Sign Up In Order To Begin Using Link-Up</h4>
        <div className="well center-block" id="Sign_up_div">
          <form id="sign-in-form" onSubmit={this.signUpForm.bind(this)}>
            <label>Name</label><br></br>
            <input className="text-center" type="text" ref="name" /><br></br>
            <label>Email</label><br></br>
            <input className="text-center" type="text" ref="email" /><br></br>
            <label>Username</label><br></br>
            <input className="text-center" type="text" ref="username"/><br></br>
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