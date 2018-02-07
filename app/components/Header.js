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
            <a className="waves-effect waves-light btn red">
              <Link style={{color:'white', padding: '5px', textDecoration: 'none'}} to="/">Home</Link>
            </a>
          </header>
      </div>
    );
  }
};
