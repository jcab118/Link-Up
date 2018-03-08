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
         <nav className = "text-center" id="navbar navbar-light bg-faded">
              <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Home">Home</Link>
              <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Profile">Profile</Link>
              <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Link_up">Link-Up</Link>
              <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Friends">Friends</Link>
              <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Notifications">Notifications</Link>
              <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Sign_out">Sign Out</Link>
              <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Settings">Settings</Link>
        </nav>
    		<footer className="text-center" id= "footer">
            <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Home">Home</Link>
            <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Profile">Profile</Link>
            <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Link_up">Link-Up</Link>
            <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Friends">Friends</Link>
            <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Notifications">Notifications</Link>
            <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Sign_out">Sign Out</Link>
            <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Settings">Settings</Link>
            <h6 className="text-center" id="copyrite-tag">&copy; 2018 J. Cabrera</h6>
        </footer>
      </div>
        );
	   }
};


