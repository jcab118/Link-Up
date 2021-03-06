import React, {Component} from 'react';
import {Link} from 'react-router-dom';

//import {Home_Styles} from './../../public/css/Home_Styles.css'

//import Header from './Header';//
//import Footer from './Footer';//


export default class Home extends Component {
  componentDidMount(){
    //document.body.style.backgroundImage = 'url(./images/linkBackground.jpg)';
  }
  render() {
    return (
      <div>
        <nav className = "text-center" id="navbar navbar-light bg-faded">
          <Link style={{color:'blue', padding: '5px', textDecoration: 'none'}} to="/Log_in">Log In</Link>
          <Link style={{color:'blue', padding: '5px', textDecoration: 'none'}} to="/Sign_up">Sign Up</Link>
        </nav>
        <div id="home-header">
            <h1 className="text-center">Link Up</h1>
            <p className="text-center">Locals getting together; 
            in local locations</p>
            <p className="text-center">Have any of the following happened to you:</p>
            <ul className="text-center">
              <li className="text-center">Left hanging after a friend committed to an activity?</li>
              <li className="text-center">Didn't do an activity you were looking forward to because you didn't have someone to do it with?</li>
              <li className="text-center">Decided to do an activity by yourself and didn't have the same enjoyment because you were by yourself?</li>
            </ul>
        </div>
        <p className="text-center">If any of these happened to you Link Up is the app for you.</p>
        <p className="text-center">Sign up now and grow the growing Community</p>
        <br></br>
        <footer className ="text-center">
          <Link style={{color:'red', padding: '5px', textDecoration: 'none'}} to="/Log_in">Log In</Link>
          <Link style={{color:'red', padding: '5px', textDecoration: 'none'}} to="/Sign_up">Sign Up</Link>
        </footer>
        <h6 className="text-center" id="copyrite-tag">&copy; 2018 J. Cabrera</h6>
      </div>
    )
  }
}