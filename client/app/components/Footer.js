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
          <footer className="text-center" id= "footer">
              <Link style={{color:'blue', padding: '5px', textDecoration: 'none'}} to="/sign_up">Sign Up</Link>
            <h6 className="text-center" id="copyrite-tag">&copy; 2018 J. Cabrera</h6>
          </footer>
        </div>
    );
  }
};