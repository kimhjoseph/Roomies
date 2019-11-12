const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ShoppingListItem = new Schema({


    _id: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String
    },

    quantity: {
        type: Number
    },

    price: {
        type: Number
    },

    completed: {
        type: Boolean
    },

    priority: {
        type: String,
        enum: ["Low", "Medium", "High", "ASAP"],
        default: "Low"

    },

    apartment: {
        type:  mongoose.Schema.Types.ObjectId,
        ref : "Apartment"
    }

});

module.exports = mongoose.model('ShoppingListItem', ShoppingListItem);