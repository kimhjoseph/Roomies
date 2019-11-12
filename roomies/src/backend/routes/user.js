const express = require('express');
const router = express.Router();
var request = require('request');

const mongoose = require('mongoose');
const User = require('../models/User');
const Apartment = require('.../models/Apartment');

//
	// create_user (post) - set name, email
	// create_apartment (post) - creates new apartment, wtth creator in [users], generates code
	// join_apartment (post) - add user to [users] of apartment whose code matches
	// update_status (post) - set status
	// get_statuses (get) - gets all statuses from [statuses]

router.post('/add_info', async function(req, res){
	if (req.body.name && req.body.email) {
		let addData = {
			name: req.body.name,
			email: req.body.email
		}
		try {
			let user = await User.findOneAndUpdate({ email: req.user.email }, addData, { new: true })
		} catch(err) {
			console.log('Error updating user.');
			res.status(500).send(err);
		}
		res.status(200).send("Success")
	}

	else {
		console.log("All fields required.")
	}
});

router.post('/update_status', async function(req, res) {
	let updatedStatus = {
		status: ((req.body.status != null) ? req.body.status : req.user.status)
	}
	try {
		let user = await User.findOneAndUpdate({ email: req.user.email }, updatedStatus, { new: true })
	} catch(err) {
		res.status(400).send("Error adding information to user.");
	}
	res.status(200).send("Success")
});

router.get('/get_statuses', async function(req, res) {
	let statuses = [];
	try {
		statuses = await User.find({ apartment: req.user.apartment }, 'status').toArray();
	} catch(err) {
		console.log("Error finding users in database.");
		res.status(500).send(err);
	}
	res.status(200).send(statuses);
});

router.get('/create_apartment', async function(req, res) {
	let apartment;
	try {
		apartment = await Apartment.create(name: req.body.name, address: req.body.address, code: 'AAAAA');
	} catch(err) {
		res.status(400).send("Error creating apartment.");
	}

	try {
		let user = await User.findOneAndUpdate({ email: req.user.email }, { apartment: apartment._id }, { new: true });
	} catch(err) {
		res.status(400).send("Error adding information to user.");
	}
	res.status(200).send(apartment.code);
});

router.post('/join_apartment', async function(req, res) {
	let apartment;
	try {
		apartment = await Apartment.findOne({ code: req.body.code });
	} catch(err) {
		res.status(400).send("Error finding apartment.");
	}

	try {
		let user = await User.findOneAndUpdate({ email: req.user.email }, { apartment: apartment._id }, { new: true });
	} catch(err) {
		res.status(400).send("Error adding information to user.");
	}
	res.status(200).send("Success");
});

module.exports = router;
