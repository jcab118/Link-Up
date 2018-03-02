import React, { Component } from 'react';
var Link = require("react-router-dom").Link;

// exporting this component to be used on all my pages

export default class Profile extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }
  render() {
    return(

        <div>
          <footer className="text-center" id= "footer">
              <Link style={{color:'blue', padding: '5px', textDecoration: 'none'}} to="/profile">Profile</Link>
                   <Link style={{color:'blue', padding: '5px', textDecoration: 'none'}} to="/friends">Friends</Link>
                        <Link style={{color:'blue', padding: '5px', textDecoration: 'none'}} to="/notifcations">Notifications</Link>
                             <Link style={{color:'blue', padding: '5px', textDecoration: 'none'}} to="/sign_out">Sign Out</Link>
            <h6 className="text-center" id="copyrite-tag">&copy; 2018 J. Cabrera</h6>
          </footer>
           <form className="well center-block" id = "location_search">
                 <label>Location</label>
              <input className="text-center" type="text" ref="location"/><br></br>
            </form>
        </div>
    );
  }
};