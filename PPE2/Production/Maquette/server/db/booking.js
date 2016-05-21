var mongoose = require('mongoose');

var commonValid = require('./../validators/common');
var validator = require('./../validators/booking');

var Booking = mongoose.model('Booking', new mongoose.Schema({
  bookingDate: { type: Date, default: Date.now },
  room: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  user: { type: String }
}));

var getBookingByRoom = function(room, callback) {
  validator.checkRoom(room, function(err){
    if(err) {
      if(commonValid.isACallback(callback)){
        callback(err);
      }
    } else {
      var room = commonValid.prepareForDatabase(room);
      Booking.find({room: room}, function(err){
        if(err){
            console.log(err);
            if(commonValid.isACallback(callback))
              callback('An error occured with the database');
          } else {
            var mess = commonValid.prepareRoomMessage(results);
            callback(null, mess);
          }
      });
    }
  });
};

module.exports.getBookingByRoom = getBookingByRoom;