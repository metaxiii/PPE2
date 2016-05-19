var mongoose = require('mongoose');

var commonValid = require('./../validators/common');
var validator = require('./../validators/user');

mongoose.connect('mongodb://localhost/user');

var User = mongoose.model('User', new mongoose.Schema({
  registerDate: { type: Date, default: Date.now },
  loginDate: { type: Date, default: Date.now },
  nickname: { type: String, required: true },
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

var login = function(credentials, callback){
  validator.checkLogin(credentials, function(err){
    if(err) {
      if(commonValid.isACallback(callback)){
        callback(err);
      }
    } else {
      User.find(
        { 
          mail: commonValid.prepareForDatabase(credentials.mail), 
          password: commonValid.prepareForDatabase(credentials.password) 
        }, function(err, results){
          if(err){
            console.log(err);
            if(commonValid.isACallback(callback))
              callback('An error occured with the database');
          } else {
            if(commonValid.isACallback(callback)){
              if(results.length === 1){
                callback(null, true);
              } else {
                var fault = 'Invalid credentials';
                
                console.log(fault);
                callback(fault);
              }
            }
          }
        })
    }
  })
};

var registerUser = function(user, callback){
  validator.checkRegistration(user, function(err){
    if(err){
      if(commonValid.isACallback(callback)){
        callback(err);
      }
    } else {
      var newUser = new User({
        nickname: commonValid.prepareForDatabase(user.nickname),
        name: commonValid.prepareForDatabase(user.name),
        mail: commonValid.prepareForDatabase(user.mail),
        password: commonValid.prepareForDatabase(user.password),
        adress: {
          street: commonValid.prepareForDatabase(user.adress.street),
          zip: commonValid.prepareForDatabase(user.adress.zip),
          town: commonValid.prepareForDatabase(user.adress.town),
          country: commonValid.prepareForDatabase(user.adress.country)
        }
      });

      newUser.save(function(err){
        if(err){
          console.log(err);
          if(commonValid.isACallback(callback))
            callback('Issue when saving new user to database.');
        } else {
          console.log('User ' + user.nickname + ' (' + user.mail + ') added to database.');
          if(commonValid.isACallback(callback))
            callback();
        }
      })
    }
  });
};

var nicknameTaken = function(nickname, callback) {
  User.find({ nickname: nickname }, function(err, results){
    if(err){
      console.log(err);
      if(commonValid.isACallback(callback)){
        callback(err);
      }
    } else {
      if(commonValid.isACallback(callback))
        callback(null, results.length === 1);
    }
  })
};

var mailTaken = function(mail, callback) {
  User.find({ mail: mail }, function(err, results){
    if(err){
      console.log(err);
      if(commonValid.isACallback(callback)){
        callback(err);
      }
    } else {
      if(commonValid.isACallback(callback))
        callback(null, results.length === 1);
    }
  })
};

module.exports.User = User;
module.exports.login = login;
module.exports.registerUser = registerUser;
module.exports.nicknameTaken = nicknameTaken;
module.exports.mailTaken = mailTaken;