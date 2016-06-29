
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

  var session = require('express-session');

var app = module.exports = express.createServer();

var mongoose = require('mongoose');
GLOBAL.mongoose = mongoose;
var db = require('./database/dbconfig.js');

app.use(session({
     secret: 'secret',
     resave: false,
     saveUninitialized: true,
}));

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

// app.get('/', routes.index);
require('./routes')(app)

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
