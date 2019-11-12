const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Apartment = new Schema({


    _id: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
     code: {
        type: String
     },

    users: [{
        type:  mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],

    chores: [{
        type:  mongoose.Schema.Types.ObjectId,
        ref : "ChoreListItem"
    }],

    groceries: [{
        type:  mongoose.Schema.Types.ObjectId,
        ref : "ShoppingListItem"
    }],

    events: [{
        type:  mongoose.Schema.Types.ObjectId,
        ref : "Event"
    }]

});

module.exports = mongoose.model('Apartment', Apartment);
