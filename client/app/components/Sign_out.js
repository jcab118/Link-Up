import React, { Component } from 'react';
var Link = require("react-router-dom").Link;

export default class Sign_out extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }
signoutUser(){
        fetch('/api/sign_out', {
            method: 'DELETE',
            credentials: 'same-origin'
        }).then((response) => {
          if(response.status == 204){
            browserHistory.push('/log_in');
          }
        });
    }
    render() {
      return (
      <ul className="right">
        <Link onClick={this.signoutUser.bind(this)}>Sign Out</Link>
      </ul>
      );
    }
};