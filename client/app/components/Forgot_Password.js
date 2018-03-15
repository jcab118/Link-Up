import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default class Forgot_Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitButtonDisabled: false
        };
    }
    signInForm(e){
        e.preventDefault()
    	var signInUser = {
    		username: this.refs.username.value,
    		password: this.refs.password.value
    	}
        fetch('/api/sign-in', {
            method: 'post',
            body: JSON.stringify(signInUser),
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            credentials: 'same-origin'
        }).then((response) => {
            if(response.status == 401){
                alert("Login Failed for Username and/or Password")
            } else {
                browserHistory.push("/log_in")
            }
        });
    }
    changePasswordForm(e){
        e.preventDefault();

        if(this.refs.newPassword.value === this.refs.confirmNewPassword.value){
            const inputs = {
                currentPassword: this.refs.currentPassword.value,
                newPassword: this.refs.newPassword.value
            }
            fetch(`/api/forgot-password-change/${this.props.params.uuid}`, {
                method: 'post',
                body: JSON.stringify(inputs),
                headers: {
                    'content-type': 'application/json',
                    'accept': 'application/json'
                },
                credentials: 'same-origin'
            }).then((response) => response.json())
            .then((results) => {
            	browserHistory.push("/log_in");
            });
        } else {
            alert('New Passwords Do Not Match');
        }
    }
	componentWillMount(){
	}
  	render() {
	    return (
	        <div>
				<div className="text-center">
		        	<h4>Forgot Your Link-Up Password?</h4>
                    <h5> No Worries We Have You Covered</h5>
					<div className="well center-block" id="sign-in-div">
                        <form onSubmit={this.changePasswordForm.bind(this)}>
                            <h3>Password Change</h3>
                            <label>Current Password</label>
                            <input className="text-center" type="password" ref="currentPassword"/>
                            <label>New Password</label>
                            <input className="text-center" type="password" ref="newPassword"/>
                            <label>Confirm New Password</label>
                            <input className="text-center" type="password" ref="confirmNewPassword"/>
                            <input disabled={this.state.submitButtonDisabled} type="submit" className="btn btn-info"/>
                        </form>
					</div>
				</div>
	        </div>
	    );
  	}
};