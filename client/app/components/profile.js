
import React, { Component } from 'react';
var Link = require("react-router-dom").Link;

import Header from './Sign_out';

export default class Profile extends Component {
  	constructor(props) {
    	super(props);
    	this.state = {
    		user:{}
    }
  };
  logoutUser(){
        fetch('/api/logout', {
            method: 'DELETE',
            credentials: 'same-origin'
        }).then((response) => {
        	if(response.status == 204){
        		browserHistory.push('/');
        	}
        });
    }
	componentWillMount(){
        fetch('/api/logged-in', {
			headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            credentials: 'same-origin'
		}).then((response) => response.json())
        .then((results) => {
            if(results.message){
                if(results.message !== "logged-in"){
                    browserHistory.push("/login")
                } else {
                	this.setState({
                		user: results.user
                	})
                }
            }
        });
	}
  	render() {
	    return (
	        <div>
	       		<nav className="navbar navbar-light bg-faded">
					<Link className="nav-links" to="/">Home</Link>
                    <Logout />
				</nav>
				<div className="text-center">
		        	<h1>Welcome to Link-Up {this.state.user.name}</h1>
		        </div>
	        </div>
	    );
  	}
};