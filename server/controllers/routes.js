var express = require('express');
var path = require('path');

var router = express.Router();

var models = require('./../models');
models.sequelize.sync();


router.get('/', function(req,res){
	res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

var request = require('request');

var NodeGeocoder = require('node-geocoder');
let google_api_key = 'AIzaSyC3vBLtCsv42_Otz5Lotz2FBKUNoqBLwdA'
var options = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: google_api_key, // for Mapquest, OpenCage, Google Premier
  formatter: 'json'         // 'gpx', 'string', ...
};

// var models = require('../models');

module.exports = (app, passport) => {


	app.post('/api/search-place', (req, res) => {
		//https:maps.googleapis.com/maps/api/place/textsearch/json?query=${req.body.searchQuery}&location=${response.coord.lon},${response.coord.lon}&radius=500&type=restaurant&keyword=cruise
	    //let google_api_url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.body.searchQuery}&location=-33.8670522,151.1957362&radius=500&radius=500&type=restaurant&keyword=cruise&key=${google_api_key}`
		var geocoder = NodeGeocoder(options);
		geocoder.geocode(req.body.address, function(geocoderError, geocoderRes) {
			let google_api_url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.body.searchQuery}&location=${geocoderRes[0].latitude},${geocoderRes[0].longitude}&key=${google_api_key}`
		  	request(google_api_url, (error, results, html) => {
		  		console.log(results.body)
		  		res.json(results.body)
		  	})
		});
	})
// 		var geocoder = NodeGeocoder(options);
// // Using callback
// 		geocoder.geocode(req.body.address, function(err, res) {
// 			let google_api_url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.body.searchQuery}&location=${res[0].latitude},${res[0].longitude}&key=${google_api_key}`
// 		  	request(google_api_url, (error, results, html) => {
// 		  		console.log(results.body)
// 		  	})
// 		});

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
		console.log(req.body)
		passport.authenticate('local-signin', function(err, user, info){
		    if (err) {
		      	return next(err);
		    }
		    if (!user) {
		    	return res.status(401).json({ success : false, message : 'authentication failed', info: info });
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

	app.get('/api/images', (req, res) => {
	models.Image.findAll({order: [
            ['id', 'ASC']
    	]}).then((images) => {
			res.json(images)
	})
})

	app.post('/api/image', (req, res) => {
		models.Image.create({
			img_src: req.body.image_src,
			UserId: req.body.user_id
		}).then((image) => {
			models.Image.findAll({order: [
            	['id', 'ASC']
    		]}).then((images) => {
				res.json(images)
			})
		}).catch((err) => {
			res.json({error: err})
	})
})

app.post('/api/message', (req,res) => {
	if(req.body.name !== '' && req.body.message !== ''){
		models.guestbook.create({
			name: req.body.name,
			message: req.body.message
		}).then(function(message){
			res.json(message);
		});
	} else if (req.body.name === '' & req.body.message !== '') {
		models.guestbook.create({
			name: "Guest",
			message: req.body.message
		}).then(function(message){
			res.json(message);
		});	
	} else if ((req.body.name !== '' && req.body.message === '') || (req.body.name === '' && req.body.message === '')) {
		res.json("null_message")
	}
});

app.get('/api/messages', (req,res) => {
	models.Guestbook.findAll({order: [
            ['id', 'ASC']
        ]}).then(function(messages){
			res.json(messages);
	});
});

app.delete('/api/delete-message/:id', (req,res) => {
	models.guestbook.destroy({where: {id: req.params.id}}).then(() => {
		models.guestbook.findAll({order: [
            ['id', 'ASC']
        ]}).then(function(messages){
			res.json(messages)
		})
	})
});

app.put('/api/update-message/:id', (req,res) => {
	models.guestbook.findOne({ where: { id: req.params.id}}).then(function(message){
		message.set('message', req.body.message);
		message.save();
	}).then(function(success){
		models.guestbook.findAll({order: [
            ['id', 'ASC']
        ]}).then(function(messages){
			res.json(messages)
		});
	}).catch(function(err){
		throw err
	});
});
app.post('/api/new-password', (req, res) => {
		models.User.findOne({where: {id: req.user.id}}).then((user)=> {
	        if(bcrypt.compareSync(req.body.currentPassword, user.get('password_hash'))){
	        	var salt = bcrypt.genSaltSync(10);
				var hashedPassword = bcrypt.hashSync(req.body.newPassword, salt);
	        	models.User.update({password_hash: hashedPassword, salt: salt},{where:{id: req.user.id}}).then((response) => {
	        		res.status(200).json({message: 'Password Successfully Changed'});
	        	})
	        }
		})
	});

	app.post('/api/forgot-password-change/:uuid', (req, res) => {
		models.User.findOne({where: {uuid: req.params.uuid}}).then((user)=> {
	        if(bcrypt.compareSync(req.body.currentPassword, user.get('password_hash'))){
	        	var salt = bcrypt.genSaltSync(10);
				var hashedPassword = bcrypt.hashSync(req.body.newPassword, salt);
	        	models.User.update({password_hash: hashedPassword, salt: salt, uuid: uuidv4()},{where:{uuid: req.params.uuid}}).then((response) => {
	        		res.status(200).json({message: 'Password Successfully Changed'});
	        	})
	        }
		})
	});

	app.post('/api/forgot-password', (req, res) => {
		models.User.findOne({where: {email: req.body.email.toLowerCase()}}).then((user) => {
			if(user){
				var transporter = nodemailer.createTransport({
					service: 'Gmail',
					auth: {
						user: process.env.EMAIL,
						pass: process.env.EMAIL_PASS
					}
				});
				var mailOptions = {
				    from: ' "" ',
				    subject: 'Forgotten Password',
				    to: user.email,
				    message: 'Name: ' + user.name + '\n' + 'Email: ' + user.email + '\n' + 'Message: Forgotten Password Link',
				    html: html_creator(user)
				};
				transporter.sendMail(mailOptions, function(error, info){
				    if(error){
				        res.json({error: error});
				    } else {
						res.json({success: info});
				    }
				});
			} else {
				res.json({error: "No user with that email"})
			}
		})
	})
	app.get('*', function(req,res){
		res.sendFile(path.join(__dirname, './../../client/public/index.html'));
	});

}