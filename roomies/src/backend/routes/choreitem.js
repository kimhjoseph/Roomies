const express = require('express');
const router = express.Router();
var request = require('request');

const mongoose = require('mongoose');
const User = require('../models/User');
const ChoreListItem = require('.../models/ChoreListItem');

//
	// add_item (post)
	// edit_item (post)
	// get_items (get)
	// delete_item (delete)
	// delete_all_items (delete)
	// get_my_items (get)

router.post('/add_item', async function(req, res) {
	if (req.body.description && req.body.frequency && req.body.first_name && req.body.last_name && req.body.priority) {
		try { let user = await User.findOne({ first_name: req.body.first_name, last_name: req.body.last_name }); }
		catch(err) { res.status(400).send("Error finding user with that first and last name."); }

		try { let item = await ChoreListItem.create(description: req.body.description, frequency: req.body.frequency, user: user._id, priority: req.body.priority, apartment: req.user.apartment); } 
		catch(err) { res.status(400).send("Error creating chore list item."); }
		res.status(201).send("Success");
	}
	else { res.status(400).send("Missing fields."); }
});

router.post('/edit_item/:id', async function(req, res) {
	try { let oldItem = await ChoreListItem.findById(req.params.id); } 
	catch (err) { res.status(400).send("Error finding item."); }

	let newUser;
	if (req.body.first_name && req.body.last_name) {
		try { let newUser = await User.findOne({ first_name: req.body.first_name, last_name: req.body.last_name }); }
		catch(err) { res.status(400).send("Error finding user with that first and last name."); }
	}

	let updatedItem = {
		description: ((req.body.description != null) ? req.body.description : oldItem.description),
		frequency: ((req.body.frequency != null) ? req.body.frequency : oldItem.frequency),
		user: ((newUser != null) ? newUser._id : oldItem.user),
		completed: ((req.body.completed != null) ? req.body.completed : oldItem.completed),
		priority: ((req.body.priority != null) ? req.body.priority : oldItem.priority)
	}
	try { let newItem = await ChoreListItem.findByIdAndUpdate(req.params.id, updatedItem, { new: true }); } 
	catch(err) { res.status(400).send("Error editing chore item."); }
	res.status(201).send("Success")
});

router.get('/get_items', async function(req, res) {
	try { let items = await ChoreListItem.find({ apartment: req.user.apartment }).toArray(); } 
	catch(err) { res.status(400).send("Error finding items in database."); }
	let populatedItems = [];
	items.forEach((item) => {
		populate(user);
		populatedItems.push({description: item.description, frequency: item.frequency, first_name: user.first_name, last_name: user.last_name, completed: item.completed, priority: item.priority}); 
	}
	res.status(200).send(populatedItems);
});

router.delete('/delete_item/:id', async function(req, res) {
	try { await ChoreListItem.deleteOne({ _id: req.params.id }); }
	catch(err) { res.status(400).send("Error deleting item."); }
	res.status(200).send("Success");
});

router.delete('/delete_all_items', async function(req, res) {
	try { await ChoreListItem.deleteMany({ apartment: req.user.apartment }); }
	catch(err) { res.status(400).send("Error clearing item list."); }
	res.status(200).send("Success");
});

router.get('/get_my_items', async function(req, res) {
	try { let items = await ChoreListItem.find({ user: req.user._id }).toArray(); }
	catch(err) { res.status(400).send("Error finding items in database."); }
	res.status(200).send(items);
});

module.exports = router;