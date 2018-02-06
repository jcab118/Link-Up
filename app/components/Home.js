import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';


export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <h1 className="text-center" id="home-header">Link Up</h1>cbundle
        <h1 className="text-center">hi</h1>
        <Footer/>
      </div>
    )
  }
}