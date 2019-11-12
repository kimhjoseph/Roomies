const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ChoreListItem = new Schema({


    _id: {
        type: Schema.Types.ObjectId
    },
    description: {
        type: String
    },

    frequency: {
        type: Number
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    completed: {
        type: Boolean
    },

    priority: {
        type: String,
        enum: ["Low", "Medium", "High", "ASAP"],
        default: "Low"

    }

});

module.exports = mongoose.model('ChoreListItem', ChoreListItem);