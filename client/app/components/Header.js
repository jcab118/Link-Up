import React, { Component } from 'react';
var Link = require("react-router-dom").Link;

export default class Header extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }
  render() {
    return (
      <div>
         <header className="text-center" id="header">
          <Link style={{color:'red', padding: '5px', textDecoration: 'none'}} to="/">Home</Link>
              <Link style={{color:'blue', padding: '5px', textDecoration: 'none'}} to="/log_in">Log In</Link>
               <Link style={{color:'orange', padding: '5px', textDecoration: 'none'}} to="/">Sign Out</Link>
          </header>
      </div>
    );
  }
};
