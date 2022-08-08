const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const PartyDataSchema = new Schema({

    game: String,
    email:String
    

});

var PartyData = mongoose.model('partyData', PartyDataSchema);

module.exports = PartyData;