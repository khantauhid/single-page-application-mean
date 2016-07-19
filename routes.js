module.exports = function(app, passport) {
  // console.log(passport);
var main = require('./controllers/main');
var registrationController = require('./controllers/registrationController');
var loginController = require('./controllers/loginController');

app.get('/',main.index);

app.post('/userSignUp', registrationController.userSignUp);
// app.post('/userSignUp', passport.authenticate('local'), function(req, res) {
// 	console.log(req.user);
// })

app.post('/userLogin', passport.authenticate('local'), loginController.userLogin);
app.post('/logOut', loginController.logOut);
}
