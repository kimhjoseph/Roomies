const express = require('express');
const router = express.Router();
var request = require('request');

const mongoose = require('mongoose');
const User = require('../models/User');
const Apartment = require('.../models/Apartment');

// 
	// create_apartment (get)
	// join_apartment (post)
	// edit_apartment (post)

/**
 * Create a new apartment and assign the new apartment id to user's apartment field.
 *
 * Use axios.get(.../apartment/create_apartment, newApartment)
 *
 * @param req contains the apartment object with name, address, and id fields
 * @return res which contains the apartment code that was generated
 */

router.get('/create_apartment', async function(req, res) {
	try { let apartment = await Apartment.create(name: req.body.name, address: req.body.address, code: 'AAAAA'); } 
	catch(err) { res.status(400).send("Error creating apartment."); }

	try { let user = await User.findOneAndUpdate({ email: req.user.email }, { apartment: apartment._id }, { new: true }); } 
	catch(err) { res.status(400).send("Error adding information to user."); }
	res.status(200).send(apartment.code);
});


/**
 * Join an existing apartment by finding apartment with the code given and assigns apartment id to user.
 *
 * Use axios.post(.../apartment/create_apartment, code)
 *
 * @param req contains the apartment code
 * @return "Success"
 */

router.post('/join_apartment', async function(req, res) {
	try { let apartment = await Apartment.findOne({ code: req.body.code }); } 
	catch(err) { res.status(400).send("Error finding apartment."); }

	try { let user = await User.findOneAndUpdate({ email: req.user.email }, { apartment: apartment._id }, { new: true }); } 
	catch(err) { res.status(400).send("Error adding information to user."); }
	res.status(200).send("Success");
});


/**
 * Find you apartment by user apartment id field.
 *
 * Use axios.get(.../apartment/get_apartment)
 *
 * @param req contains the user session variable
 * @return res containing the apartment found
 */


router.get('/get_apartment', async function(req, res) {
	try { let apartment = await Apartment.findById(req.user.apartment); } 
	catch(err) { res.status(400).send("Error finding apartment in database."); }
	res.status(200).send(apartment);
});



/**
 * Edit you apartment fields by first finding the apartment using user apartment field.
 *
 * Use axios.post(.../apartment/edit_apartment)
 *
 * @param req contains the user session variable and the new apartment object
 * @return "Success"
 */


router.post('/edit_apartment', async function(req, res) {
	try { let oldApartment = await Apartment.findById(req.user.apartment); } 
	catch (err) { res.status(400).send("Error finding apartment in database."); }

	let updatedApartment = {
		name: ((req.body.name != null) ? req.body.name : oldApartment.name),
		address: ((req.body.address != null) ? req.body.address : oldApartment.address)
	}
	try {
		let newApartment = await Apartment.findByIdAndUpdate(req.body.id, updatedApartment, { new: true });
	} catch(err) {
		res.status(400).send("Error editing chore item.");
	}
	res.status(200).send("Success")
})
