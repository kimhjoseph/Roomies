const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/User');
const ChoreListItem = require('../models/ChoreListItem');

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


function getDaysRemaining(createdAt, days) {
	const _MS_PER_DAY = 1000 * 60 * 60 * 24;
	var diffDays = Math.floor(((createdAt.getDate() + days) - (Date.now.getDate() - createdAt.getDate())) / _MS_PER_DAY);
	return diffDays
}

router.post('/add_item', async function(req, res) {
	var name = req.body.userName.split(" ");
	var userFirstName = userName[0];
	var userLastName = userName[1];

	try { let user = await User.findOne({ first_name: userFirstName, last_name: userLastName }); }
	catch(err) { res.status(400).send("Error finding user with that first and last name."); }

	try { let item = await ChoreListItem.create({ description: req.body.description, completed: req.body.completed, user: user._id, apartment: req.user.apartment, created: req.body.created, days: req.body.days }); } 
	catch(err) { res.status(400).send("Error creating chore list item."); }
	res.status(201).send("Success");
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
	if (req.body.userName) {
		var name = req.body.userName.split(" ");
		var userFirstName = userName[0];
		var userLastName = userName[1];

		try { let newUser = await User.findOne({ first_name: userFirstName, last_name: userLastName }); }
		catch(err) { res.status(400).send("Error finding user with that first and last name."); }
	}
  
	let updatedItem = {
		description: ((req.body.description != null) ? req.body.description : oldItem.description),
		completed: ((req.body.completed != null) ? req.body.completed : oldItem.completed),
		user: ((newUser != null) ? newUser._id : oldItem.user),
		days: ((days != null) ? req.body.days : oldItem.days)
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
		var diffDays = getDaysRemaining(item.created, item.days)
		item.populate('user').exec(err, item) {
			if (err) { res.status(400).send("Error populating item."); }
			populatedItems.push({description: item.description, completed: item.completed, first_name: item.user.first_name, last_name: item.user.last_name, daysRemaining: diffDays});
		}
	});
	res.status(200).json(populatedItems);
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

	let UserItems = [];
	items.forEach((item) => {
		var diffDays = getDaysRemaining(item.created, item.days)
		populatedItems.push({description: item.description, completed: item.completed, daysRemaining: diffDays}); 
	});
	res.status(200).json(UserItems);
});

module.exports = router;