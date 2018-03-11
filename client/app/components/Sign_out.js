import React, { Component } from 'react';
var Link = require("react-router-dom").Link;

export default class Sign_out extends Component {
  signoutUser(){
    fetch('/api/sign_out', {
        method: 'DELETE',
        credentials: 'same-origin'
    }).then((response) => {
      if(response.status == 204){
        browserHistory.push('/Log_in');
      }
    });
  }
  render() {
    return (
      <ul className="right">
        <a onClick={this.signoutUser.bind(this)}>Sign Out</a>
      </ul>
    );
  }
};