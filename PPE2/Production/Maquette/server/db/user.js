var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/user');

var User = mongoose.model('User', new mongoose.Schema({
  registerDate: { type: Date, default: Date.now },
  loginDate: { type: Date, default: Date.now },
  nickname: { type: String, required: true },
  surname: { type: String, required: true },
  name: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  adress: {
    street: { type: String, required: true },
    zip: { type: String, required: true },
    town: { type: String, required: true },
    country: { type: String, required: true }
  }
}));

var findUserForLogin = function(credentials, callback){
  User.find(function(err, results){
    if(err){
      console.log(err);
      if(callback && typeof(callback) == "function"){
        callback(err);
      }
    } else {
      if(callback && typeof(callback) == "function")
        callback(null, results);
    }
  })
};

var registerUser = function(user){
  // Add callback, and unique verifications
  if(user && user.surname && user.name && user.mail && user.password && user.adress && user.adress.street && user.adress.zip && user.adress.town && user.adress.country){
    var newUser = new User(user);

    newUser.save(function(err){
      if(err){
        console.log(err);
      } else {
        console.log('User ' + user.mail + ' added to database.')
      }
    })
  } else {
    console.log('Missing arguments in registerUser function.');
  }
}

module.exports.User = User;
module.exports.findUserForLogin = findUserForLogin;
module.exports.registerUser = registerUser;