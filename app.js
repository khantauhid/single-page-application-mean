require('./model/main-model.js');
var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var simpleDB = mongoose.model('feedBackModel');

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    passwordEn = 'd6F3Efeq';

//==================================================================
// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
  function(username, password, done, req, res, next) {
    function encrypt(text) {
        var cipher = crypto.createCipher(algorithm, passwordEn)
        var crypted = cipher.update(text, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    }
    var encryptedPassword = encrypt(password);
    // console.log(encryptedPassword);
    // console.log(username);
    // console.log(password);
    simpleDB.findOne({
      email : username,
      password : encryptedPassword
    }, {firstName:1, lastName:1, email:1, _id:0}, function(err, data){
      // console.log(JSON.stringify(data));
      if(data){
        return done(null, data);
      } else {
        return done(null, false, { message: 'Incorrect username.' });
      }
    })
  }
)); 

// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
    done(null, user);
    // console.log(user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Start express application
var app = express();

app.use(session({
     secret: 'secret',
     resave: false,
     saveUninitialized: true,
}));

//==================================================================

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization
app.use(express.static(path.join(__dirname, 'public')));

require('./database/dbconfig');
require('./routes')(app, passport);
//==================================================================

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
