const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define userData schema
const userDataSchema = new Schema({
    gender: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
    locale: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    timezone: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    long: {
        type: String,
        required: true
    }
}); // userDataSchema

const UserData = mongoose.model('userData', userDataSchema);

module.exports = UserData;
