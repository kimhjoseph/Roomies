const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
var ObjectID = mongoose.Types.ObjectId;
const User = require("../models/User");
const ShoppingListItem = require("../models/ShoppingListItem");

//
// add_item (post)
// edit_item (post)
// get_items (get)
// delete_item (delete)
// delete_all_items (delete)

/**
 * Create a new ShoppingListItem.
 *
 * Use axios.post(.../choreitem/add_item, newShoppingListItem)
 *
 * @param req contains the new ShoppingListItem with name, quantity, price, priority, completed and apartment.
 * @return "Success"
 */

router.post("/add_item", async function(req, res) {
  // let userIds = [];
  // for (let userName in req.body.users) {
  //   var name = userName.split(" ");
  //   var userFirstName = name[0];
  //   var userLastName = name[1];
  //   try {
  //     let user = await User.findOne({
  //       first_name: userFirstName,
  //       last_name: userLastName
  //     });
  //   } catch (err) {
  //     res.status(400).send("Error finding user with that first and last name.");
  //   }
  //   userIds.push(user._id);
  // }
  try {
    // let item = await ShoppingListItem.create({
    //   item: req.body.item,
    //   description: req.body.description,
    //   apartment: req.user.apartment,
    //   users: userIds
    // });
    let item = await ShoppingListItem.create({
      item: req.body.item,
      description: req.body.description
    });
  } catch (err) {
    res.status(400).send("Error creating shopping list item.");
  }
  res.status(201).send("Success");
});

/**
 * Edit an existing ShoppingListItem. Find the item using the object id and then update it.
 *
 * Use axios.post(.../shoppingitem/edit_item/:id, newShoppingListItem)
 *
 * @param req contains the new ShoppingListItem with all relevant fields and the id of the ShoppingListItem.
 * @return res containing "Success"
 */

// router.post('/edit_item/:id', async function(req, res) {
// 	try { let oldItem = await ShoppingListItem.findById(req.params.id); }
// 	catch (err) { res.status(400).send("Error finding apartment in database."); }

// 	let userIds = [];
// 	for (let userName in req.body.users) {
// 		var name = userName.split(" ");
// 		var userFirstName = name[0];
// 		var userLastName = name[1];
// 		try { let user = await User.findOne({ first_name: userFirstName, last_name: userLastName }); }
// 		catch(err) { res.status(400).send("Error finding user with that first and last name."); }
// 		userIds.push(user._id);
// 	}

// 	let updatedItem = {
// 		item: ((req.body.item != null) ? req.body.item : oldItem.item),
// 		description: ((req.body.description != null) ? req.body.description : oldItem.description),
// 		users: ((req.body.users != null) ? userIds : oldItem.users),
// 	}

// 	try { let newItem = await ShoppingListItem.findByIdAndUpdate(req.params.id, updatedItem, { new: true }); }
// 	catch(err) { res.status(400).send("Error editing shopping list item."); }
// 	res.status(201).send("Success")
// });

/**
 * Getting all ShoppingListItems for the apartment by user apartment id.
 *
 * Use axios.get(.../shoppingitem/get_items)
 *
 * @param req user session variable
 * @return res containing a list of ShoppingListItems found."
 */

router.get("/get_items", async function(req, res) {
  try {
    // let items = await ShoppingListItem.find({
    //   _id: new ObjectID("5ddeca711c9d4400000141db")
    // }).toArray();
    let items = await ShoppingListItem.find().toArray();
  } catch (err) {
    // try { let items = await ShoppingListItem.find({ apartment: req.user.apartment }).toArray(); }
    res.status(400).send("Error finding items in database.");
  }

  let populatedItems = [];
  for (let item in items) {
    try {
      let item = await item.populate("users");
    } catch (err) {
      res.status(400).send("Error populating item.");
    }
    let names = [];
    for (let user in item.users) {
      names.push(user.first_name + " " + user.last_name);
    }
    populatedItems.push({
      item: item.item,
      description: item.description,
      users: names
    });
  }
  res.status(200).json(populatedItems);
});

/**
 * Delete a ShoppingListItem by object id.
 *
 * Use axios.delete(.../shoppingitem/delete_item:id)
 *
 * @param req contains the id paramater of the object to be deleted.
 * @return "Success"
 */

router.delete("/delete_item/:id", async function(req, res) {
  try {
    await ChoreListItem.deleteOne({ _id: req.params.id });
  } catch (err) {
    res.status(400).send("Error deleting item.");
  }
  res.status(200).send("Success");
});

/**
 * Delete all ShoppingListItems for the apartment by user apartment id.
 *
 * Use axios.delete(.../shoppingitem/delete_all_items)
 *
 * @param req user session variable with apartment_id
 * @return "Success"
 */

router.delete("/delete_all_items", async function(req, res) {
  try {
    await ShoppingListItem.deleteMany({ apartment: req.user.apartment });
  } catch (err) {
    res.status(400).send("Error clearing item list.");
  }
  res.status(200).send("Success");
});

// router.post('charge_users', async function(req, res) {
// 	try { let completedItems = await ShoppingListItem.find({ completed: true }).toArray(); }
// 	catch(err) { res.status(400).send("Error finding items."); }

// 	let charges = {};
// 	for (let item in completedItems) {
// 		let individualCharge = item.price / item.users.length;
// 		for (let userID in item.users) {
// 			if (userID in charges) { charges[userID] += individualCharge; }
// 			else { charges[userID] = individualCharge; }
// 		}
// 	}
// });

module.exports = router;
