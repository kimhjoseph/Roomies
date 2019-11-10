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
