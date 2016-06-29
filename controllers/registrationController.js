require('../model/main-model.js');
var mongoose = require('mongoose');
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';
var simpleDB = mongoose.model('feedBackModel');
var randomToken = require('random-token');

exports.userSignUp = function(req, res){
  // console.log(req.body);
  var token = randomToken(16);
  function encrypt(text) {
        var cipher = crypto.createCipher(algorithm, password)
        var crypted = cipher.update(text, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    }
  var encryptedPassword = encrypt(req.body.password);
  // console.log(token);
  // console.log(encryptedPassword);
  simpleDB.find({
    email : req.body.email
  }, function (err, data){
    if(data.length > 0) {
      console.log("already registered");
      res.json({
        'message' : 'already registered' + req.body.email,
        'authentication' : false
      });
    } else {
      var signUpData = new simpleDB({
        firstName : req.body.firstName,
        lastName  : req.body.lastName,
        email     : req.body.email,
        password  : encryptedPassword,
        Is_Active : false,
        token : token,
      });
      signUpData.save(function(err, data){
        if (err) {
          console.log(err);
        } else {
          console.log("saved successfully");
          // console.log(JSON.stringify(data));
        }
      })
      res.json({
        'message' : 'registration completed',
        'authentication' : true
      })
    }
  })
}
