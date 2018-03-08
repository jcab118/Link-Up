import React, { Component } from 'react';
import axios from 'axios';
var Link = require("react-router-dom").Link;

export default class Friends extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }
  render() {
    return (
    	<div>
    		<footer className="text-center" id= "footer">
                      <Link style={{color:'blue', padding: '5px', textDecoration: 'none'}} to="/Link_up">Link-Up</Link>
                      <Link style={{color:'blue', padding: '5px', textDecoration: 'none'}} to="/profile">Profile</Link>
                      <Link style={{color:'blue', padding: '5px', textDecoration: 'none'}} to="/notifcations">Notifications</Link>
                      <Link style={{color:'blue', padding: '5px', textDecoration: 'none'}} to="/sign_out">Sign Out</Link>
                      <h6 className="text-center" id="copyrite-tag">&copy; 2018 J. Cabrera</h6>
            </footer>
        </div>
        );
	}
};


