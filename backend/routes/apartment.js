const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/User');
const Apartment = require('../models/Apartment');

// 
	// create_apartment (get)
	// join_apartment (post)
	// get_apartment (get)
	// edit_apartment (post)

function makeId() {
   var result = '';
   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < 5; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

/**
 * Create a new Apartment.
 *
 * Use axios.post(.../apartment/create_apartment, newApartment)
 *
 * @param req contains the new Apartment with description, frequency, user first_name and last_name, completed and priority.
 * @return res contining the apartment code generated. 
 */

router.post('/create_apartment', async function(req, res) {
	try { let apartment = await Apartment.create({ _id: req.body.id, name: req.body.name, address: req.body.address, code: makeId() }); } 
	catch(err) { res.status(400).send("Error creating apartment."); }

	try { let user = await User.findOneAndUpdate({ email: req.user.email }, { apartment: apartment._id }, { new: true }); } 
	catch(err) { res.status(400).send("Error adding information to user."); }
	res.status(201).send(apartment.code);
});


/**
 * Join an apartment.
 *
 * Use axios.post(.../apartment/join_apartment, code)
 *
 * @param req contains the code of the apartment to be joined.
 * @return "Success" on completion
 */


router.post('/join_apartment', async function(req, res) {
	try { let apartment = await Apartment.findOne({ code: req.body.code }); } 
	catch(err) { res.status(400).send("Error finding apartment."); }

	try { let user = await User.findOneAndUpdate({ email: req.user.email }, { apartment: apartment._id }, { new: true }); } 
	catch(err) { res.status(400).send("Error adding information to user."); }
	res.status(201).send("Success");
});



/**
 * Retrieve an apartment of a user.
 *
 * Use axios.get(.../apartment/get_apartment)
 *
 * @param req contains the user session variable
 * @return res continaing the retrieved Apartment object.
 */

router.get('/get_apartment', async function(req, res) {
	try { let apartment = await Apartment.findById(req.user.apartment); } 
	catch(err) { res.status(400).send("Error finding apartment."); }
	res.status(200).send(apartment);
});

/**
 * Retrieve an apartment of a user.
 *
 * Use axios.post(.../apartment/edit_apartment, newApartment)
 *
 * @param req contains the user session variable and the newApartment object
 * @return res continaing the retrieved Apartment object.
 */

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
