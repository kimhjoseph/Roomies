const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/User");
const ShoppingListItem = require("../models/ShoppingListItem");
const Apartment = require("../models/Apartment");

// add (post)
// get (get)
// delete (delete)

/**
 * Create a new ShoppingListItem.
 *
 * Use axios.post(.../shoppingitem/add, newShoppingListItem)
 *
 * @param req contains the new ShoppingListItem with name, quantity, price, priority, completed and apartment.
 * @return "Success"
 */

router.post("/add", async function(req, res) {
  let userIds = [];

  let requests = req.body.people.map(async user => {
    return new Promise(async (resolve, reject) => {
      var name = user.split(" ");
      var userFirstName = name[0];
      var userLastName = name[1];
      try {
        let foundUser = await User.findOne({
          first_name: userFirstName,
          last_name: userLastName
        });
        userIds.push(foundUser._id);
      } catch (err) {
        reject();
      }
      resolve();
    });
  });

  Promise.all(requests)
    .then(async () => {
      let item = await ShoppingListItem.create({
        item: req.body.item,
        description: req.body.notes,
        apartment: new ObjectId("5ddecc7a1c9d4400000141dd"),
        // apartment: req.user.apartment,
        users: userIds
      });
      res.status(201).send(item._id);
    })
    .catch(() => {
      res.status(400).send("Error creating shopping list item.");
    });
});

/**
 * Getting all ShoppingListItems for the apartment by user apartment id.
 *
 * Use axios.get(.../shoppingitem/get_item)
 *
 * @param req user session variable
 * @return res containing a list of ShoppingListItems found."
 */

router.route("/get").get((req, res) => {
  // ShoppingListItem.find({ apartment: req.user.apartment })
  ShoppingListItem.find({ apartment: new ObjectId("5ddecc7a1c9d4400000141dd") })
    .populate("users")
    .then(items => {
      let populatedItems = [];
      items.forEach(item => {
        let names = [];
        item.users.forEach(user => {
          names.push(user.first_name + " " + user.last_name);
        });
        populatedItems.push({
          item: item.item,
          notes: item.description,
          people: names,
          itemID: item._id
        });
      });
      res.status(200).json(populatedItems);
    })
    .catch(error => res.status(400).json("Error: " + error));
});

/**
 * Delete a ShoppingListItem by object id.
 *
 * Use axios.delete(.../shoppingitem/delete:id)
 *
 * @param req contains the id paramater of the object to be deleted.
 * @return "Success"
 */

router.delete("/delete/:id", async function(req, res) {
  try {
    await ShoppingListItem.deleteOne({ _id: req.params.id });
  } catch (err) {
    res.status(400).send("Error deleting item.");
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


/*

These are the new routes from backend!

router.post("/add", async function(req, res) {
  let userIds = [];

  let requests = req.body.people.map(async user => {
    return new Promise(async (resolve, reject) => {
      var name = user.split(" ");
      var userFirstName = name[0];
      var userLastName = name[1];
      try {
        let foundUser = await User.findOne({
          first_name: userFirstName,
          last_name: userLastName
        });
        userIds.push(foundUser._id);
      } catch (err) {
        reject();
      }
      resolve();
    });
  });

  Promise.all(requests)
    .then(() => {
      let item = ShoppingListItem.create({
        item: req.body.item,
        description: req.body.notes,
        apartment: new ObjectId("5ddecc7a1c9d4400000141dd"),
        // apartment: req.user.apartment,
        users: userIds
      });
      res.status(201).send("Success");
    })
    .catch(() => {
      res.status(400).send("Error creating shopping list item.");
    });
});


router.post('/edit_item/:id', async function(req, res) {
	let oldItem;
	try { oldItem = await ShoppingListItem.findById(req.params.id); }
	catch (err) { res.status(400).send("Error finding apartment in database."); }

	let userIds = [];
	req.body.users.forEach(async (user) => {
		var name = userName.split(" ");
		var userFirstName = name[0];
		var userLastName = name[1];

		let user;
		try { user = await User.findOne({ first_name: userFirstName, last_name: userLastName }); }
		catch(err) { res.status(400).send("Error finding user with that first and last name."); }
		userIds.push(user._id);
	});

	let updatedItem = {
		name: ((req.body.name != null) ? req.body.name : oldItem.name),
		description: ((req.body.description != null) ? req.body.description : oldItem.description),
		quantity: ((req.body.quantity != null) ? req.body.quantity : oldItem.quantity),
		price: ((req.body.price != null) ? req.body.price : oldItem.price),
		completed: ((req.body.completed != null) ? req.body.completed : oldItem.completed),
		users: ((req.body.users != null) ? userIds : oldItem.users),
	}

	let newItem;
	try { newItem = await ShoppingListItem.findByIdAndUpdate(req.params.id, updatedItem, { new: true }); } 
	catch(err) { res.status(400).send("Error editing shopping list item."); }
	res.status(201).send("Success") 
});

router.get('/get_items', async function(req, res) {
	let items;
	try { items = await ShoppingListItem.find({ apartment: "5ddecc7a1c9d4400000141dd" }).populate("users"); }
	catch(err) { res.status(400).send(("Error finding items in database.")); }

	let populatedItems = [];
	items.forEach((item) => {
		let names = [];
		for (let user in item.users) {
			names.push(user.first_name + " " + user.last_name);
		}
		populatedItems.push({name: item.item, description: item.description, people: names, apartment: item.apartment});
	});
	res.status(200).json(populatedItems); 
});

router.delete('/delete_item/:id', async function(req, res) {
	try { await ChoreListItem.deleteOne({ _id: req.params.id }); }
	catch(err) { res.status(400).send("Error deleting item."); }
	res.status(200).send("Success");
});

router.delete('/delete_all_items', async function(req, res) {
	try { await ShoppingListItem.deleteMany({ apartment: req.user.apartment }); }
	catch(err) { res.status(400).send("Error clearing item list."); }
	res.status(200).send("Success");
});

router.post('charge_users', async function(req, res) {
	try { let completedItems = await ShoppingListItem.find({ completed: true }).toArray(); }
	catch(err) { res.status(400).send("Error finding items."); }

	let charges = {};
	for (let item in completedItems) {
		let individualCharge = item.price / item.users.length;
		for (let userID in item.users) {
			if (userID in charges) { charges[userID] += individualCharge; }
			else { charges[userID] = individualCharge; }
		}
	}
});


*/
