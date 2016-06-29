var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/mySimpDB';
mongoose.connect(dburl);
mongoose.connection.on('connected', function() {
  console.log('mongoose default connection open to '  + dburl);
});
mongoose.connection.on('err', function(err){
  console.log('mongoose default connection err' + err);
});
