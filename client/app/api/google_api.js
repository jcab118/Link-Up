import axios from 'axios';

module.exports = (map) => {
  let api_key = 'AIzaSyDHozeqnR0BzUAVFt1JaQWuaZCHIxINwK0'
  let api_url = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDHozeqnR0BzUAVFt1JaQWuaZCHIxINwK0&callback=initMap`
  return axios.get(api_url, {
	headers: {
		'content-type': 'application/json',
		'accept': 'application/json'
	}
  }).then((results) => {
  	return results
  });
}