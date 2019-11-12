const express = require('express');
const router = express.Router();
var request = require('request');

const mongoose = require('mongoose');
const User = require('../models/User');
const Apartment = require('.../models/Apartment');
const ShoppingListItem = require('.../models/ShoppingListItem');

//
	// add_item (post) - adds item to [shoppinglistitems]
	// delete_item (delete) - delete item on id
	// delete_all_items (delete) - clears list
	// get_items (get) - get all items from [shoppinglistitems]

router.post('/add_item', async function(req, res) {
	try {
		let shoppingItem = await ShoppingListItem.create(name: req.body.name, quantity: req.body.quantity, price: req.body.price, completed: req.body.completed, priority: req.body.priority, apartment: req.user.apartment);
	} catch(err) {
		res.status(400).send("Error creating shopping list item.");
	}
	res.status(200).send("Success");
});

router.post('/edit_item', async function(req, res) {
	let updatedItem = {
		name: ((req.body.name != null) ? req.body.name : req.user.name),
		quantity: ((req.body.quantity != null) ? req.body.quantity : req.user.quantity),
		completed: ((req.body.completed != null) ? req.body.completed : req.user.completed),
		priority: ((req.body.priority != null) ? req.body.priority : req.user.priority)
	}
	try {
		let shoppingItem = await ShoppingListItem.findByIdAndUpdate(req.body.id, updatedItem, { new: true });
	} catch(err) {
		res.status(400).send("Error editing shopping list item.");
	}
	res.status(200).send("Success")
});

router.get('/get_items', async function(req, res) {
	let items = [];
	try {
		items = await ShoppingListItem.find({ apartment: req.user.apartment }).toArray();
	} catch(err) {
		console.log("Error finding items in database.");
		res.status(500).send(err);
	}
	res.status(200).send(items);
});

module.exports = router;