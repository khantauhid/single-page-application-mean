require('../model/main-model.js');
var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

exports.userLogin = function(req, res){
  console.log(req.body);
  res.send({
    authentication : true,
    message : "successfully Login"
  });
  
  // function encrypt(text) {
  //       var cipher = crypto.createCipher(algorithm, password)
  //       var crypted = cipher.update(text, 'utf8', 'hex')
  //       crypted += cipher.final('hex');
  //       return crypted;
  //   }
  // var encryptedPassword = encrypt(req.body.password);
  // // console.log(encryptedPassword);
  // var simpleDB = mongoose.model('feedBackModel');
  // simpleDB.find({
  //   email : req.body.email,
  //   password : encryptedPassword
  // }, function(err, data) {
  //   // console.log(JSON.stringify(data));
  //   if (data.length > 0) {
  //     responseObj = {
  //       'firstName' : data[0].firstName,
  //       'lastName' : data[0].lastName,
  //       'email' : data[0].email,
  //       'message' : "successfully login",
  //       'authentication' : true
  //     }
  //     res.json(responseObj);
  //     req.session.user = responseObj;
  //     // console.log(JSON.stringify(req.session.user))
  //   } else {
  //     // console.log(data);
  //     res.json({
  //       'message' : "login failed",
  //       "authentication" : false
  //     })
  //   }
  // })

}

exports.logOut = function(req, res){
  req.session.destroy(function(err){
    res.json({
      'session' : false
    })
  })
}
