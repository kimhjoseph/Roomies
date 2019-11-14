const express = require('express');
const router = express.Router();
var request = require('request');

const mongoose = require('mongoose');
const User = require('../models/User');
const Apartment = require('../models/Apartment');

// 
	// create_apartment (get)
	// join_apartment (post)
	// get_apartment (get)
	// edit_apartment (post)

router.post('/create_apartment', async function(req, res) {
	try { let apartment = await Apartment.create({ _id: req.body.id, name: req.body.name, address: req.body.address, code: 'AAAAA' }); } 
	catch(err) { res.status(400).send("Error creating apartment."); }

	try { let user = await User.findOneAndUpdate({ email: req.user.email }, { apartment: apartment._id }, { new: true }); } 
	catch(err) { res.status(400).send("Error adding information to user."); }
	res.status(201).send(apartment.code);
});

router.post('/join_apartment', async function(req, res) {
	try { let apartment = await Apartment.findOne({ code: req.body.code }); } 
	catch(err) { res.status(400).send("Error finding apartment."); }

	try { let user = await User.findOneAndUpdate({ email: req.user.email }, { apartment: apartment._id }, { new: true }); } 
	catch(err) { res.status(400).send("Error adding information to user."); }
	res.status(201).send("Success");
});

router.get('/get_apartment', async function(req, res) {
	try { let apartment = await Apartment.findById(req.user.apartment); } 
	catch(err) { res.status(400).send("Error finding apartment."); }
	res.status(200).send(apartment);
});

router.post('/edit_apartment', async function(req, res) {
	try { let oldApartment = await Apartment.findById(req.user.apartment); } 
	catch (err) { res.status(400).send("Error finding apartment in database."); }

	let updatedApartment = {
		name: ((req.body.name != null) ? req.body.name : oldApartment.name),
		address: ((req.body.address != null) ? req.body.address : oldApartment.address)
	}
	try { let newApartment = await Apartment.findByIdAndUpdate(req.user.apartment, updatedApartment, { new: true }); } 
	catch(err) { res.status(400).send("Error editing chore item."); }
	res.status(201).send("Success")
});

module.exports = router;