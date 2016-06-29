var feedBackSchema = mongoose.Schema;
var feedBackData = new mongoose.Schema({
  firstName : {type : String},
  lastName : {type : String},
  email   : {type : String, required : true},
  password : {type : String},
  Is_Active : {type : Boolean},
  token : {type : String}
});
var feedBackModel	= module.exports = mongoose.model('feedBackModel', feedBackData);
