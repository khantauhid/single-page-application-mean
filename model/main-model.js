var mongoose = require('mongoose');
var feedBackSchema = mongoose.Schema;
// var passportLocalMongoose = require('passport-local-mongoose');
var feedBackData = new mongoose.Schema({
  firstName : {type : String},
  lastName : {type : String},
  email   : {type : String, required : true},
  password : {type : String, required : true},
  Is_Active : {type : Boolean},
  token : {type : String}
});

// feedBackData.plugin(passportLocalMongoose);

var feedBackModel	= module.exports = mongoose.model('feedBackModel', feedBackData);
