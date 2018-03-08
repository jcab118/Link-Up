var express = require('express');
var path = require('path');

var router = express.Router();

var models = require('./../models');
models.sequelize.sync();

var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

var request = require('request');

// var models = require('../models');

module.exports = (app, passport) => {


	app.post('/api/search-place', (req, res) => {
        var weather_api_key = '275d5dfdea53a2d3e3869f48d154e9ac';
        var weather_api_url = `http://api.openweathermap.org/data/2.5/weather?appid=${weather_api_key}&units=imperial&q=`;
		let google_api_key = 'AIzaSyC3vBLtCsv42_Otz5Lotz2FBKUNoqBLwdA'
		//https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.body.searchQuery}&location=${response.coord.lon},${response.coord.lon}&radius=500&type=restaurant&keyword=cruise
	    let google_api_url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.body.searchQuery}&location=-33.8670522,151.1957362&radius=500&radius=500&type=restaurant&keyword=cruise&key=${google_api_key}`
		//request weather api, within the response, get the lat and lon, and plug them into the google_api_url

	app.get('.api/search-place')
	
			request(google_api_url, (err, results, html) => {
				res.json(JSON.parse(results.body).results)
			})
	})

	app.get('/api/sign-up', function(req,res){
		if(req.user){
			res.json({message: 'signed-in', user_id: req.user.id});
		}
	});

	app.get('/api/sign-in', function(req,res){
		if(req.user){
			res.json({message: 'signed-in', user_id: req.user.id});
		}
	});

	app.post('/api/sign-up', function(req,res,next){
		passport.authenticate('local-signup', function(err, user, info){
			if (err) {
				return next(err);
			} else {
				res.json({user: user, info: info})
			}
		})(req, res, next);
	});

	app.post('/api/sign-in', function(req,res,next){
		passport.authenticate('local-signin', function(err, user, info){
		    if (err) {
		      	return next(err);
		    }
		    if (!user) {
		    	return res.json({ success : false, message : 'authentication failed', info: info });
		    }
		    req.login(user, function(err){
				if(err){
					return next(err);
				}
		      	return res.status(200).json({ success : true, message : 'authentication succeeded', object : user });        
			});
	  	})(req, res, next);
	});

	app.get('/api/signed-in', (req,res) => {
		if(req.user){
			res.json({message: 'signed-in', user: req.user});
		} else {
			res.json({message: 'no req.user'})
		}
	})

	app.delete('/api/sign_out', function (req, res) {
		req.session.destroy(function(){
			res.status(204).send();
		});
	});

	app.get('*', function(req,res){
		res.sendFile(path.join(__dirname, './../../client/public/index.html'));
	});

}