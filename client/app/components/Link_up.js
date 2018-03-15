import React, { Component } from 'react';
import axios from 'axios';
var Link = require("react-router-dom").Link;



// exporting this component to be used on all my pages

export default class Profile extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      submitButtonDisabled: false,
      searchResults: undefined
    };
  }
  
  componentDidMount() {
  }
  searchForm(e){
    e.preventDefault();

    let inputs = {
      searchQuery: this.refs.search.value.split(" ").join("+").toLowerCase(),
      address: this.refs.city.value.split(" ").join("+").toLowerCase()
    }
    //console.log(city)
    //let api_key = 'AIzaSyDhd7oR7LFMpzzqaKnWxfKip733aktPkSM'
    //let api_url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyDhd7oR7LFMpzzqaKnWxfKip733aktPkSM`
    fetch('/api/search-place', {
      method: 'POST',
      body: JSON.stringify(inputs),
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      }
      }).then((response) => response.json())
      .then((results) => {
          this.setState({
            searchResults: JSON.parse(results).results
          })
      });
  }
  componentWillMount(){

  }
  render() {
    console.log(this.state)
    const appendInfo = () => {
      if(this.state.searchResults){
        return this.state.searchResults.map((res) => {
          return(
            <div className="text-center">
            <p>Name: {res.name}</p>
              <p>Address: {res.formatted_address}</p>
              <br></br>
            </div>
          )
        })
      }
    }
    return(
      <div>
      <nav className = "text-center" id="navbar navbar-light bg-faded">
          <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Profile">Profile</Link>
          <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Link_up">Link-Up</Link>
          <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Friends">Friends</Link>
          <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Notifications">Notifications</Link>
          <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Sign_out">Sign Out</Link>
          <Link style={{color:'blue', padding: '10px', textDecoration: 'none'}} to="/Settings">Settings</Link>
      </nav>
        <div className="text-center">
          <h3>Where would you like to Link-Up</h3>
        </div>
        <br></br>
        <div className="search-input">
          <form id="search-bar" onSubmit={this.searchForm.bind(this)}>
            <label>Search</label><br></br>
            <input type="text" ref="search"/>
            <label>City</label>
            <input type="text" ref="city"/> 
            <br></br>
            <input disabled={this.state.submitButtonDisabled} className="search-bar" id="submit-this" type="submit"/>
          </form>
        </div>
        <div id="everything-div">
          {appendInfo()}
        </div>
        {}  
        <footer className="text-center" id= "footer">
            <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Profile">Profile</Link>
            <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Link_up">Link-Up</Link>
            <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Friends">Friends</Link>
            <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Notifications">Notifications</Link>
            <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Sign_out">Sign Out</Link>
            <Link style={{color:'red', padding: '10px', textDecoration: 'none'}} to="/Settings">Settings</Link>
            <h6 className="text-center" id="copyrite-tag">&copy; 2018 J. Cabrera</h6>
        </footer>
        <div id="map" style={{height: '500px', width: '500px'}}></div>
      </div>
    );
  }
};