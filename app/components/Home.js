import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';


export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <h1 className="text-center" id="home-header">Link Up</h1>
        <p className="text-center">Locals getting together to play sports. 
        in local locations</p>
        <p className="text-center">Have any of the following happened to you:</p>
        <ul className="text-center">
          <li className="text-center">Left hanging after a friend committed to an activity?</li>
          <li className="text-center">Didn't do an activity you were looking forward to because you didn't have someone to do it with?</li>
          <li className="text-center">Decided to do an activity by yourself and didn't have the same enjoyment because you were by yourself?</li>
        </ul>
        <p className="text-center">If any of these happened to you Link Up is the app for you.</p>
        <p className="text-center">Sign up now and grow the growing Community</p>
        <Footer/>
      </div>
    )
  }
}