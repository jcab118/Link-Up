import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Sign_out extends Component {
  signoutUser(){
    fetch('/api/sign_out', {
        method: 'DELETE',
        credentials: 'same-origin'
    }).then((response) => {
      if(response.status == 204){
        this.props.history.push('/Log_in');
      }
    });
  }
  render() {
    return (
        <Link to="#" onClick={this.signoutUser.bind(this)}>Sign Out</Link>
    );
  }
};

export default withRouter(Sign_out);