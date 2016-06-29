module.exports = function(app) {
  // console.log("hello");
var main = require('./controllers/main');
var registrationController = require('./controllers/registrationController');
var loginController = require('./controllers/loginController');

app.get('/',main.index);

app.post('/userSignUp', registrationController.userSignUp);
app.post('/userLogin', loginController.userLogin);
app.post('/logOut', loginController.logOut);
}
