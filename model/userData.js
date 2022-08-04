const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userDataSchema = new Schema({

    username: String,
    otp: Number,
    email: String,
    provider:String,
    proPlayer:Boolean

});

var UserData = mongoose.model('userdata', userDataSchema);

module.exports = UserData;