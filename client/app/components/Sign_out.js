import React, { Component } from 'react';
var Link = require("react-router-dom").Link;

export default class Sign_out extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }
  render() {
    return (
      <div>
         <header className="header">
          <Link className="waves-effect waves-light btn green" style={{color:'white', padding: '5px', textDecoration: 'none'}} to="/">Sign Out</Link>
          </header>
      </div>
    );
  }
};