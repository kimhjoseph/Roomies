const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/User");
const ChoreListItem = require("../models/ChoreListItem");

//
// add (post)
// edit_item (post)
// get (get)
// delete_item (delete)
// delete_all_items (delete)
// getmyitems (get)

function getDaysRemaining(createdAt, days) {
  createdAt.setDate(createdAt.getDate() + days);
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const now = Date.now();

  const diffTime = createdAt - now;
  const diffDays = Math.ceil(diffTime / _MS_PER_DAY);
  return diffDays;
}

/**
 * Create a new ChoreListItem. We first find the user id to be assigned to using the first and last name and then use that as a reference.
 *
 * Use axios.post(.../choreitem/add, newChoreListItem)
 *
 * @param req contains the new ChoreListItem with user, description, created timestamp, and days to complete.
 * @return "Successfully added chore!"
 */

router.post("/add", async function(req, res) {
  var name = req.body.userName.split(" ");
  var userFirstName = name[0];
  var userLastName = name[1];

  let user;
  try {
    user = await User.findOne({
      first_name: userFirstName,
      last_name: userLastName
    });
  } catch (err) {
    res.status(400).send("Error finding user with that first and last name.");
  }

  let item;
  try {
    item = await ChoreListItem.create({
      description: req.body.description,
      user: user._id,
      apartment: req.session.user.apartment,
      days: req.body.days
    });
  } catch (err) {
    res.status(400).send("Error creating chore list item.");
  }
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

router.post("/edit/:id", async function(req, res) {
  let oldItem;
  try {
    oldItem = await ChoreListItem.findById(req.params.id);
  } catch (err) {
    res.status(400).send("Error finding item.");
  }

  let newUser;
  if (req.body.userName) {
    var name = req.body.userName.split(" ");
    var userFirstName = name[0];
    var userLastName = name[1];

    try {
      newUser = await User.findOne({
        first_name: userFirstName,
        last_name: userLastName
      });
    } catch (err) {
      res.status(400).send("Error finding user with that first and last name.");
    }
  }

  let updatedItem = {
    description:
      req.body.description != null ? req.body.description : oldItem.description,
    completed:
      req.body.completed != null ? req.body.completed : oldItem.completed,
    user: newUser != null ? newUser._id : oldItem.user,
    days: req.body.days != null ? req.body.days : oldItem.days
  };

  let newItem;
  try {
    newItem = await ChoreListItem.findByIdAndUpdate(
      req.params.id,
      updatedItem,
      { new: true }
    );
  } catch (err) {
    res.status(400).send("Error editing chore item.");
  }
  res.status(201).send("Success");
});

/**
 * Getting all ChoreListItems for the apartment by user apartment id.
 * Populate the user field with user first_name and last_name.
 *
 * Use axios.post(.../choreitem/get)
 *
 * @return res containing a list of all ChoreListItems found.
 */

// hard coded apartment
router.get("/get_all_items", async function(req, res) {
  let items;
  try {
    items = await ChoreListItem.find({
      apartment: req.session.user.apartment
    }).populate("user");
    console.log(items);
  } catch (err) {
    res.status(400).send("Error finding items in database.");
  }

  let populatedItems = [];
  items.forEach(item => {
    console.log(item);
    var name = item.user.first_name + " " + item.user.last_name;
    var diffDays = getDaysRemaining(item.created, item.days);
    populatedItems.push({
      id: item._id,
      chore: item.description,
      user: name,
      days: diffDays
    });
  });
  res.status(200).json(populatedItems);
});

/*
router.get("/get_all_items", async function(req, res) {
  ChoreListItem.find({ apartment: new ObjectId("5ddecc7a1c9d4400000141dd") })
    .populate("user")
    .then(chores => {
      let populatedItems = [];
      let name = "";
      chores.forEach(chore => {
        name = chore.user.first_name + " " + chore.user.last_name;
        var diffDays = getDaysRemaining(chore.created, chore.days);
        populatedItems.push({
          chore: chore.description,
          id: chore._id,
          user: name,
          days: diffDays
        });
      });
      res.status(200).json(populatedItems);
    })
    .catch(err => res.status(400).json("Error: " + err));
});
*/

/**
 * Delete a ChoreListItem by object id.
 *
 * Use axios.get(.../choreitem/delete_item:id)
 *
 * @param req contains the id paramater of the chore to be deleted.
 * @return "Successfully deleted chore item."
 */

router.delete("/delete_item/:id", async function(req, res) {
  try {
    await ChoreListItem.deleteOne({ _id: req.params.id });
  } catch (err) {
    res.status(400).send("Error deleting item.");
  }
  res.status(200).send("Successfully deleted chore item!");
});

/**
 * Delete all ChoreListItems for the apartment by user apartment id.
 *
 * Use axios.delete(.../choreitem/delete_all_items)
 *
 * @param req user session variable with apartment_id
 * @return "Success"
 */

router.delete("/delete_all_items", async function(req, res) {
  try {
    await ChoreListItem.deleteMany({ apartment: req.session.user.apartment });
  } catch (err) {
    res.status(400).send("Error clearing item list.");
  }
  res.status(200).send("Success");
});

/**
 * Retrieve all ChoreListItems by user id, and populates with days remaning.
 *
 * Use axios.get(.../choreitem/get_my_items)
 *
 * @param req user session variable with user _id
 * @return res containing a list of items retrieved and populated.
 */

router.get("/get_my_items", async function(req, res) {
  let items;
  try {
    items = await ChoreListItem.find({ user: req.session.user._id });
  } catch (err) {
    res.status(400).send("Error finding items in database.");
  }

  let userItems = [];
  items.forEach(item => {
    var diffDays = getDaysRemaining(item.created, item.days);
    userItems.push({ id: item._id, chore: item.description, days: diffDays });
  });
  res.status(200).json(userItems);
});

/*
router.get("/get_my_items", async function(req, res) {
  ChoreListItem.find({ user: new ObjectId(req.body._id) })
    .then(myChores => {
      let populatedItems = [];
      myChores.forEach(chore => {
        var diffDays = getDaysRemaining(chore.created, chore.days);
        populatedItems.push({
          chore: chore.description,
          id: chore._id,
          days: diffDays
        });
      });
      res.json(populatedItems);
    })
    .catch(err => res.status(400).json("Error: " + err));
});
*/

module.exports = router;
