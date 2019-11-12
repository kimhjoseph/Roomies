const express = require('express');
const router = express.Router();
var request = require('request');

const mongoose = require('mongoose');
const User = require('../models/User');
const Apartment = require('.../models/Apartment');
const ShoppingListItem = require('.../models/ChoreListItem');

//
	// add_item (post) - adds item to [chorelistitems]
	// edit_item (post) - edits item
	// delete_item (delete) - delete item on id
	// delete_all_items (delete) - clears list
	// get_items (get) - get all items from [chorelistitems]

router.post('/add_item', async function(req, res) {
	try {
		let choreItem = await ChoreListItem.create(description: req.body.description, frequency: req.body.frequency, user: req.body.user, completed: req.body.completed, priority: req.body.priority, apartment: req.user.apartment);
	} catch(err) {
		res.status(400).send("Error creating chore list item.");
	}
	res.status(200).send("Success");
});

router.post('/edit_item', async function(req, res) {
	let updatedItem = {
		description: ((req.body.description != null) ? req.body.description : req.user.description),
		frequency: ((req.body.frequency != null) ? req.body.frequency : req.user.frequency),
		user: ((req.body.user != null) ? req.body.user : req.user.user),
		completed: ((req.body.completed != null) ? req.body.completed : req.user.completed),
		priority: ((req.body.priority != null) ? req.body.priority : req.user.priority)
	}
	try {
		let choreItem = await ChoreListItem.findByIdAndUpdate(req.body.id, updatedItem, { new: true });
	} catch(err) {
		res.status(400).send("Error editing chore item.");
	}
	res.status(200).send("Success")
});

router.get('/get_items', async function(req, res) {
	let items = [];
	try {
		items = await ChoreListItem.find({ apartment: req.user.apartment }).toArray();
	} catch(err) {
		console.log("Error finding items in database.");
		res.status(500).send(err);
	}
	res.status(200).send(items);
});

module.exports = router;