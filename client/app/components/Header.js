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
         <header className="header">
          <Link className="waves-effect waves-light btn red" style={{color:'white', padding: '5px', textDecoration: 'none'}} to="/">Home</Link>
          <a className="waves-effect waves-light btn blue">
              <Link style={{color:'white', padding: '5px', textDecoration: 'none'}} to="/log_in">Log In</Link>
               <Link className="waves-effect waves-light btn green" style={{color:'white', padding: '5px', textDecoration: 'none'}} to="/">Sign Out</Link>
            </a>
          </header>
      </div>
    );
  }
};
