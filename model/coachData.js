const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const CoachDataSchema = new Schema({

    email: String,
    pro:String,
    approve:Boolean
    

});

var coachData = mongoose.model('coachData', CoachDataSchema);

module.exports = coachData;