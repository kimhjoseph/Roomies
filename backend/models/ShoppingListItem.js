const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ShoppingListItem = new Schema({

    name: {
        type: String
    },

    description {
        type: String,
        default: ""
    }

    quantity: {
        type: Number
    },

    price: {
        type: Number
    },

    completed: {
        type: Boolean
    },

    apartment: {
        type:  Schema.Types.ObjectId,
        ref : "Apartment"
    },

    users: {
        type: [Scheme.Types.ObjectId],
        ref: "User"
    }

});

module.exports = mongoose.model('ShoppingListItem', ShoppingListItem);
