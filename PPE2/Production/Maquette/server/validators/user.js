var validator = require('validator');
var commonValid = require('./common');
var User = require('./../db/user');
var writelog = require('./../common/writelog').writelog;

// TODO: factorize
var config = require('./../common/config').config;

module.exports.checkRegistration = function(user, callback){
  var TYPE = 'NEW USER VALIDATIONS';
  var err = '';
  // Complete object validation
  if(!user){
    err = 'No user object given.';

    console.log(err);
    if(commonValid.isACallback(callback))
        callback(err);
        
    writelog(err, TYPE);
  } 

  else if (!user.name) {
    err = 'No property name in user object';

    console.log(err);
    if(commonValid.isACallback(callback))
        callback(err);
        
    writelog(err, TYPE);
  } 

  else if (!user.mail) {
    err = 'No property mail in user object';

    console.log(err);
    if(commonValid.isACallback(callback))
        callback(err);
        
    writelog(err, TYPE);
  } 

  else if (!user.password) {
    err = 'No property password in user object';

    console.log(err);
    if(commonValid.isACallback(callback))
        callback(err);
        
    writelog(err, TYPE);
  } 

  else if (!user.adress) {
    err = 'No property adress in user object';

    console.log(err);
    if(commonValid.isACallback(callback))
        callback(err);
        
    writelog(err, TYPE);
  } 

  else if (!user.adress.street) {
    err = 'No property adress.street in user object';

    console.log(err);
    if(commonValid.isACallback(callback))
        callback(err);
        
    writelog(err, TYPE);
  } 

  else if (!user.adress.zip) {
    err = 'No property adress.zip in user object';

    console.log(err);
    if(commonValid.isACallback(callback))
        callback(err);
        
    writelog(err, TYPE);
  } 

  else if (!user.adress.town) {
    err = 'No property adress.town in user object';

    console.log(err);
    if(commonValid.isACallback(callback))
        callback(err);
        
    writelog(err, TYPE);
  } 

  else if (!user.adress.country) {
    err = 'No property adress.country in user object';

    console.log(err);
    if(commonValid.isACallback(callback))
        callback(err);
        
    writelog(err, TYPE);
  }

  // Sizes validation
  else if(user.name.length > config.size_limit.NAME){
    err = 'name exceed size limit'

    console.log(err);
    if(commonValid.isACallback(callback))
        callback(err);
        
    writelog(err, TYPE);
  } 

  else if(user.nickname.length > config.size_limit.NICKNAME){
    err = 'nickname exceed size limit'

    console.log(err);
    if(commonValid.isACallback(callback))
        callback(err);
        
    writelog(err, TYPE);
  } 

  else if(user.adress.street.length > config.size_limit.adress.STREET){
    err = 'adress.street exceed size limit'

    console.log(err);
    if(commonValid.isACallback(callback))
        callback(err);
        
    writelog(err, TYPE);
  } 

  else if(user.adress.zip.length > config.size_limit.adress.ZIP){
    err = 'adress.zip exceed size limit'

    console.log(err);
    if(commonValid.isACallback(callback))
        callback(err);
        
    writelog(err, TYPE);
  } 

  else if(user.adress.town.length > config.size_limit.adress.TOWN){
    err = 'adress.town exceed size limit'

    console.log(err);
    if(commonValid.isACallback(callback))
        callback(err);
        
    writelog(err, TYPE);
  } 

  else if(user.adress.country.length > config.size_limit.adress.COUNTRY){
    err = 'adress.country exceed size limit'

    console.log(err);
    if(commonValid.isACallback(callback))
        callback(err);
        
    writelog(err, TYPE);
  } 

  else if(user.mail.length > config.size_limit.MAIL){
    err = 'mail exceed size limit'

    console.log(err);
    if(commonValid.isACallback(callback))
        callback(err);
        
    writelog(err, TYPE);
  }

  // ZIP
  else if(!user.adress.zip.match(/^[0-9]+$/)){
    err = 'ZIP code in wrong format'

    console.log(err);
    if(commonValid.isACallback(callback))
        callback(err);
        
    writelog(err, TYPE);
  }

  // Mail
  else if(!validator.isEmail(user.mail)){
    err = 'mail in wrong format'

    console.log(err);
    if(commonValid.isACallback(callback))
        callback(err);
        
    writelog(err, TYPE);
  } else {
    // Check multiple nickname
    User.nicknameTaken(user.nickname, function(err, results){
      if(err){
        console.log(err);
        if(commonValid.isACallback(callback))
          callback(err);
        
        writelog(err, TYPE);
      } else {
        if(results === true){
          console.log('Nickname is already taken')
          callback('Nickname already taken');
        
          writelog('Nickname already taken', TYPE);
        } else {
          // Check multiple mail
          User.mailTaken(user.mail, function(err, results){
            if(err){
              console.log(err);
              if(commonValid.isACallback(callback)){
                callback(err);
              }
        
              writelog(err, TYPE);
            } else {
              if(results === true){
                if(commonValid.isACallback(callback)){
                  console.log('Mail is already taken')
                  callback('Mail already taken');
        
                  writelog('Mail already taken', TYPE);
                }
              } else {
                // Positive case
                callback();
              }
            }
          })
        }
      }
    })
  }
};

module.exports.checkLogin = function(credentials, callback){
  var TYPE = 'LOGIN VALIDATIONS';
   if(!credentials){
    err = 'No credentials object given.';

    console.log(err);
    if(commonValid.isACallback(callback))
        callback(err);
        
    writelog(err, TYPE);
  } 

  else if (!credentials.mail) {
    err = 'No property mail in credentials object';

    console.log(err);
    if(commonValid.isACallback(callback))
        callback(err);
        
    writelog(err, TYPE);
  } 

  else if (!credentials.password) {
    err = 'No property password in credentials object';

    console.log(err);
    if(commonValid.isACallback(callback))
        callback(err);
        
    writelog(err, TYPE);
  } else if (!validator.isEmail(credentials.mail)) {
    err = 'Mail is in wrong format';

    console.log(err);
    if(commonValid.isACallback(callback))
        callback(err);
        
    writelog(err, TYPE);
  } else {
    if(commonValid.isACallback(callback))
        callback();
  }
};