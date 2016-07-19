require('../model/main-model.js');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';
var simpleDB = mongoose.model('feedBackModel');

// console.log(LocalStrategy);

// passport.use(new LocalStrategy(simpleDB.authenticate()));
// passport.serializeUser(simpleDB.serializeUser());
// passport.deserializeUser(simpleDB.deserializeUser());

var randomToken = require('random-token');

exports.userSignUp = function(req, res, next){
  // console.log(req.body.firstName);
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
  // passport.use(new LocalStrategy({
  //       firstName : req.body.firstName,
  //       lastName  : req.body.lastName,
  //       email     : req.body.email,
  //       password  : encryptedPassword,
  // }, function(email) {}))
  simpleDB.find({
    email : req.body.email
  }, function (err, data){
    if(data.length > 0) {
      console.log("already registered");
      // console.log(passport-local);
      /*passport.authenticate('local')(req, res, next, function (req, res) {
            // res.redirect('/registration');
            console.log("in authentication");
          });*/
      // passport.authenticate('local'), function() {
      //    console.log("in authentication");
      //  }
      res.json({
        'message' : 'already registered '  +  req.body.email,
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
      // passport.authenticate('passport-local')(req, res, next, function () {
      //       res.redirect('/login');
      //   });
     /* passport.use('local', new LocalStrategy({
        email : 'email',
        password : 'password'
      },
        function(email, password, done) {
          simpleDB.authenticate(email, password, function(err, user) {
            console.log(user);
          })
        }
      ))*/
    }
  })
}
