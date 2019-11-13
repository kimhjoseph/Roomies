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

router.post('/add_item', async function(req, res) {
	try { let item = await ChoreListItem.create(description: req.body.description, frequency: req.body.frequency, user: req.body.user, completed: req.body.completed, priority: req.body.priority, apartment: req.user.apartment); } 
	catch(err) { res.status(400).send("Error creating chore list item."); }
	res.status(200).send("Success");
});

router.post('/edit_item', async function(req, res) {
	try { let oldItem = await ChoreListItem.findById(req.body.id); } 
	catch (err) { res.status(400).send("Error finding apartment in database."); }

	let updatedItem = {
		description: ((req.body.description != null) ? req.body.description : oldItem.description),
		frequency: ((req.body.frequency != null) ? req.body.frequency : oldItem.frequency),
		user: ((req.body.user != null) ? req.body.user : oldItem.user),
		completed: ((req.body.completed != null) ? req.body.completed : oldItem.completed),
		priority: ((req.body.priority != null) ? req.body.priority : oldItem.priority)
	}
	try { let newItem = await ChoreListItem.findByIdAndUpdate(req.body.id, updatedItem, { new: true }); } 
	catch(err) { res.status(400).send("Error editing chore item."); }
	res.status(200).send("Success")
});

router.get('/get_items', async function(req, res) {
	try { let items = await ChoreListItem.find({ apartment: req.user.apartment }).toArray(); } 
	catch(err) { res.status(400).send("Error finding items in database."); }
	res.status(200).send(items);
});

router.delete('/delete_item/:id', async function(req, res) {
	try { await ChoreListItem.deleteOne({ _id: req.params.id }); }
	catch(err) { res.status(400).send("Error deleting item."); }
	res.status(200).send("Success");
});

router.delete('/delete_all_items', async function(req, res) {
	try { await ChoreListItem.drop(); }
	catch(err) { res.status(400).send("Error dropping collection."); }
	res.status(200).send("Success");
});

module.exports = router;