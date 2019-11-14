const express = require('express');
const router = express.Router();
var request = require('request');

const mongoose = require('mongoose');
const User = require('../models/User');
const Apartment = require('.../models/Apartment');

//
	// edit_info (post)
	// get_users (get)

router.post('/edit_info', async function(req, res){
	let updatedData = {
		first_name: ((req.body.first_name != null) req.body.first_name : req.user.first_name),
		last_name: ((req.body.last_name != null) req.body.last_name : req.user.last_name),
		email: ((req.body.email != null) req.body.email : req.user.email),
		status: ((req.body.status != null) ? req.body.status : req.user.status)
	}
	try { let user = await User.findOneAndUpdate({ email: req.user.email }, updatedData, { new: true }); } 
	catch(err) {
		console.log('Error updating user.');
		res.status(400).send(err);
	}
	res.status(201).send("Success")
});

router.get('/get_users', async function(req, res) {
	try { let users = await User.find({ apartment: req.user.apartment }).toArray(); }
	catch(err) {
		console.log("Error finding users in database.");
		res.status(400).send(err);
	}
	res.status(200).send(users);
});

module.exports = router;
