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
          <nav className="navbar navbar-default clearfix" role="navigation">
              <p className="text-center" id="header-title">Link Up</p>
          </nav>
        </header>
      </div>
    );
  }
};
