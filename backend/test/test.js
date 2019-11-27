const mongoose = require('mongoose');
const User = require('../models/User');
const Apartment = require('../models/Apartment');
const ChoreListItem = require('../models/ChoreListItem')

// tests get_users for get functionality
beforeEach(async function() {
  await User.clear();
  let user1 = { _id: 1, first_name: "Amlan", last_name: "Bose", email: "dummy_email", status: "Sleeping", apartment: 1};
  let user2 = { _id: 2, first_name: "Pradyuman", last_name: "Mittal", email: "dummy_email_2", status: "Busy", apartment: 1};
  await User.save([user1, user2]);
});

describe('#find()', function() {
  it('finds matching users', async function() {
    const users = await User.find({ apartment: 1 }).toArray();
    users.should.have.length(2);
  });
});

// tests create_apartment for create functionality
beforeEach(async function() {
	await Apartment.clear();
});

describe('#create()', function() {
  it('creates correct Apartment object', async function() {
    const apartment = await Apartment.create({ _id: 1, name: "Atrium", address: "10965 Strathmore Dr", code: "AAAAA" });
    assert.equal(apartment.name, "Atrium");
  });
});

// tests edit_apartment for edit functionality
beforeEach(async function() {
	await Apartment.clear();
	await Apartment.create({ _id: 1, name: "Atrium", address: "10965 Strathmore Dr", code: "AAAAA" });
});

describe('#findOneAndUpdate', function() {
	it('edits Apartment object correctly', async function() {
		let oldApartment = await Apartment.findOne({ _id: 1 });
		let updatedApartment = { name: "Red Roebs", address: "10943 Roebling Avenue" };
		let newApartment = await Apartment.findOneAndUpdate({ _id: 1 }, updatedApartment, { new: true });
		assert.equal(newApartment.name, "Red Roebs");
	})
});

// tests add_item to check that User and ChoreListItem interact correctly
beforeEach(async function() {
	await User.clear()
	await User.create({ _id: 1, first_name: "Pradyuman", last_name: "Mittal", email: "dummy_email_2", status: "Busy", apartment: 1 });
	await ChoreListItem.clear();
});

describe('#create()', function() {
	it('creates correct ChoreListItem object', async function() {
		let user = await User.findOne({ first_name: "Pradyuman", last_name: "Mittal" });
		let choreitem = await ChoreListItem.create({ description: "Clean", frequency: 1, user: user._id, priority: "High", apartment: 1 });
		assert.equal(choreitem.user, 1);
	});
});


// tests delete_item for delete functionality
beforeEach(async function() {
	await ChoreListItem.clear()
	await ChoreListItem.create({ id: 1, description: "Clean", frequency: 1, user: user._id, priority: "High", apartment: 1 });
});

describe('#delete()', function() {
	it('deletes ChoreListItem object', async function() {
		await ChoreListItem.deleteOne({ id: 1 });
		assert.equal(ChoreListItem.length, 0);
	});
});