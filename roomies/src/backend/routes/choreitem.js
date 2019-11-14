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



/**
 * Create a new ChoreListItem. We first find the user id to be assigned to using the first and last name and then use that as a reference.
 *
 * Use axios.post(.../choreitem/add_item, newChoreListItem)
 *
 * @param req contains the new ChoreListItem with description, frequency, user first_name and last_name, completed and priority.
 * @return "Success"
 */


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


/**
 * Edit an existing ChoreListItem. Find the chore using the object id and then update it.
 *
 * Use axios.post(.../choreitem/edit_item/:id, newChoreListItem)
 *
 * @param req contains the new ChoreListItem with all relevant fields and the id of the ChoreListItem.
 * @return res containing "Success"
 */

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


/**
 * Getting all ChoreListItems for the apartment by user apartment id.
 * Populate the user field with user first_name and last_name.
 *
 * Use axios.post(.../choreitem/get_items)
 *
 * @param req user session variable
 * @return res containing a list of ChoreListItems found."
 */


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

/**
 * Delete a ChoreListItem by object id.
 *
 * Use axios.get(.../choreitem/delete_item:id)
 *
 * @param req contains the id paramater of the chore to be deleted.
 * @return "Success"
 */


router.delete('/delete_item/:id', async function(req, res) {
	try { await ChoreListItem.deleteOne({ _id: req.params.id }); }
	catch(err) { res.status(400).send("Error deleting item."); }
	res.status(200).send("Success");
});

/**
 * Delete all ChoreListItems for the apartment by user apartment id.
 *
 * Use axios.delete(.../choreitem/delete_all_items)
 *
 * @param req user session variable with apartment_id
 * @return "Success"
 */


router.delete('/delete_all_items', async function(req, res) {
	try { await ChoreListItem.deleteMany({ apartment: req.user.apartment }); }
	catch(err) { res.status(400).send("Error clearing item list."); }
	res.status(200).send("Success");
});


/**
 * Retrieve all ChoreListItems by user id.
 *
 * Use axios.delete(.../choreitem/get_my_items)
 *
 * @param req user session variable with user _id
 * @return res containing a list of items retrieved.
 */

router.get('/get_my_items', async function(req, res) {
	try { let items = await ChoreListItem.find({ user: req.user._id }).toArray(); }
	catch(err) { res.status(400).send("Error finding items in database."); }
	res.status(200).send(items);
});

module.exports = router;

