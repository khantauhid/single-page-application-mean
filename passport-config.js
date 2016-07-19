exports = module.exports = function(app, passport, LocalStrategy) {
	console.log("I am in passport-config");

	// Define the strategy to be used by PassportJS
/*passport.use(new LocalStrategy(
  function(usernameField, password, done) {
    console.log(usernameField);
  }
));*/
passport.use('local', new LocalStrategy({
	usernameField : 'email',
	passwordField : 'password',
	passReqToCallback : true
}, function(req, email, password, done){
	console.log(email);
}))
	 passport.serializeUser(function(user, done) {
		  done(null, user);
	      console.log("One.."+user);
    });
	  passport.deserializeUser(function(obj, done) {
      // done(null, obj);
      console.log("One.."+obj)
    });


	  // Define a middleware function to be used for every secured routes
			var auth = function(req, res, next){
			  if (!req.isAuthenticated())
			  	res.send(401);
			  else
			  	next();
			};

		// route to test if the user is logged in or not
		app.get('/checkSession', function(req, res) {
		  res.send(req.isAuthenticated() ? req.user : '0');
		});


	  passport.use('local', new LocalStrategy({
	  	email : 'email',
	  	password : 'password'
	  }, function(req, email, password, done) {
	  	console.log("I have been called");
	  	var mongoose = require('mongoose');
	  	var simpleDB = mongoose.model('feedBackModel');

	  	simpleDB.findOne({
	  		email : 'email'
	  	}, function(err, user) {
	  		// console.log(data);
	  		if (err) {
	  			return done(err);
	  		} else if (user) {
	  			return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
	  		} else {

	  			console.log("data saved");
	  			// var signUpData = new simpleDB({
	  			// 	firstName : 'firstName',
	  			// 	lastName  : 'lastName',
	  			// 	email     : 'email',
	  			// 	password  : 'password',
	  			// 	Is_Active : false
	  			// });
	  			// signUpData.save(function(err) {
	  			// 	if (err)
      //                   throw err;
      //               return done(null, signUpData);
	  			// })
	  		}
	  	})
	  }))
} 