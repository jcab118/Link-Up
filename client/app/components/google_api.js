
import React, {Component} from 'react';

import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
        location: undefined
      };
  }
  searchLocation(e){
    e.preventDefault();

    let city = this.refs.location.value.split(" ").join("+").toLowerCase();
    //console.log(city)
    let api_key = 'AIzaSyDhd7oR7LFMpzzqaKnWxfKip733aktPkSM'
    let api_url = `https://maps.googleapis.com/maps/api/place/nearbysearch/output?parameters}`
    axios.get(api_url, {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      }
    }).then((results) => {
      this.setState({
        location: results.data
      })
      this.refs.location.value = "";
    });
  }
  render() {
    console.log(this.state.location)
    const displayLocation = () => {
      if(this.state.location){
        return (
          <div>
            <h5>Location Result</h5>
            <p>City: {this.state.location.name}</p>
          </div>
        )
      }
    }
    return (
      <div style={{width: '15%'}}>
        <form onSubmit={this.searchLocation.bind(this)}>
          <label>City</label>
          <input type="text" ref="cityWeather"/>
          <input type="submit"/>
        </form>
        <br></br>
        {displayLocation()}
      </div>
    );
  }
};