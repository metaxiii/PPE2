var validator = require('validator');

var isACallback = function(callback){
  if(callback && typeof(callback) == "function")
    return true;
  return false;
}

var prepareForDatabase = function(htmlInput){
  if(htmlInput)
    return validator.escape(htmlInput.toString());
  return null;
}

var prepareRoomMessage = function(message) {
  var mess = [];
  
  for(var i=0; i<results.length; i++){
    mess.push({
      room: results[i].room,
      startDate: results[i].startDate,
      endDate: results[i].endDate
    })
  }
  
  return mess;
}

module.exports.isACallback = isACallback;
module.exports.prepareForDatabase = prepareForDatabase;
module.exports.prepareRoomMessage = prepareRoomMessage;
