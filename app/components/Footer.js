import React, { Component } from 'react';
var Link = require("react-router-dom").Link;

// exporting this component to be used on all my pages

export default class Footer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }
  render() {
    return(

        <div>
          <footer className="footer">
            <a className="waves-effect waves-light btn red">
              <Link style={{color:'white', padding: '5px', textDecoration: 'none'}} to="/">Home Page</Link>
            </a>
            <a className="waves-effect waves-light btn yellow">
              <Link style={{color:'slategrey', padding: '5px', textDecoration: 'none'}} to="/about">About Page</Link>
            </a>
            <a className="waves-effect waves-light btn blue">
              <Link style={{color:'white', padding: '5px', textDecoration: 'none'}} to="/contact">Contact Page</Link>
            </a>
            <h4 className="text-center" id="copyrite-tag">&copy; 2018 J. Cabrera.</h4>
          </footer>
        </div>
    );
  }
};