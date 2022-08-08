const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userDataSchema = new Schema({

    username: String,
    otp: Number,
    profile_pic:String,
    phone_number:String,
    channel_name: String,
    email: String,
    provider:String,
    proPlayer:Boolean,
    superAdmin:Boolean,
    adminReq:Boolean,
    discord_id:String,
    current_balance: String,
    status:Boolean

});

var UserData = mongoose.model('userdata', userDataSchema);

module.exports = UserData;