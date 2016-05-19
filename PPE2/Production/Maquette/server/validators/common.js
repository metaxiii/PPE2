var validator = require('validator');

var isACallback = function(callback){
  if(callback && typeof(callback) == "function")
    return true;
  return false;
}

var prepareForDatabase = function(htmlInput){
  return validator.escape(htmlInput.toString());
}

module.exports.isACallback = isACallback;
module.exports.prepareForDatabase = prepareForDatabase;