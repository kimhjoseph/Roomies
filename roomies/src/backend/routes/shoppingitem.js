const express = require('express');
const router = express.Router();
var request = require('request');

const mongoose = require('mongoose');
const User = require('../models/User');
const ShoppingListItem = require('.../models/ShoppingListItem');

//
	// add_item (post)
	// edit_item (post)
	// get_items (get)
	// delete_item (delete)
	// delete_all_items (delete)

router.post('/add_item', async function(req, res) {
	try { let item = await ShoppingListItem.create(name: req.body.name, quantity: req.body.quantity, price: req.body.price, completed: req.body.completed, priority: req.body.priority, apartment: req.user.apartment); } 
	catch(err) { res.status(400).send("Error creating shopping list item."); }
	res.status(201).send("Success");
});

router.post('/edit_item/:id', async function(req, res) {
	try { let oldItem = await ShoppingListItem.findById(req.params.id); } 
	catch (err) { res.status(400).send("Error finding apartment in database."); }

	let updatedItem = {
		name: ((req.body.name != null) ? req.body.name : oldItem.name),
		quantity: ((req.body.quantity != null) ? req.body.quantity : oldItem.quantity),
		completed: ((req.body.completed != null) ? req.body.completed : oldItem.completed),
		priority: ((req.body.priority != null) ? req.body.priority : oldItem.priority)
	}
	try { let newItem = await ShoppingListItem.findByIdAndUpdate(req.params.id, updatedItem, { new: true }); } 
	catch(err) { res.status(400).send("Error editing shopping list item."); }
	res.status(201).send("Success")
});

router.get('/get_items', async function(req, res) {
	try { let items = await ShoppingListItem.find({ apartment: req.user.apartment }).toArray(); } 
	catch(err) { res.status(400).send(("Error finding items in database.")); }
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