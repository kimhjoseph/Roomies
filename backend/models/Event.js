const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Event = new Schema({

    description: {
        type: String
    },

    frequency: {
        type: Number
    },

    location: {
        type: String
    },

    time: {
        type: String
    },

    users: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

    apartment: {
        type:  Schema.Types.ObjectId,
        ref : "Apartment"
    }

});

module.exports = mongoose.model('Event', Event);
