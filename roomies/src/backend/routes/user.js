const express = require('express');
const router = express.Router();
var request = require('request');

const mongoose = require('mongoose');
const User = require('../models/User');
const Apartment = require('.../models/Apartment');

//
	// create_user (post)
	// update_status (post)
	// get_statuses (get)



/**
 * Edits user information.
 *
 * Use axios.post(.../user/edit_info, newUser)
 *
 * @param req contains the newUser object which contains first_name, last_name, email, status
 * @return            "Success"
 */
router.post('/add_info', async function(req, res){
	if (req.body.first_name && req.body.last_name && req.body.email) {
		let addData = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email
		}
		try { let user = await User.findOneAndUpdate({ email: req.user.email }, addData, { new: true }); } 
		catch(err) {
			console.log('Error updating user.');
			res.status(400).send(err);
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
	try { let user = await User.findOneAndUpdate({ email: req.user.email }, updatedStatus, { new: true }); } 
	catch(err) {
		console.log('Error adding information to user.');
		res.status(400).send(err);	
	}
	res.status(200).send("Success");
});

/**
 * Get relevant users.
 *
 * Use axios.get(.../user/get_users, newUser)
 *
 * @param req contains session user variable
 * @return array of matching User objects found
 */

router.get('/get_statuses', async function(req, res) {
	try { let statuses = await User.find({ apartment: req.user.apartment }, 'status').toArray(); }
	catch(err) {
		console.log("Error finding users in database.");
		res.status(400).send(err);
	}
	res.status(200).send(statuses);
});

module.exports = router;
