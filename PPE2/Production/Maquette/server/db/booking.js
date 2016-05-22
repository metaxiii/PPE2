var mongoose = require('mongoose');

var commonValid = require('./../validators/common');
var validator = require('./../validators/booking');

var writelog = require('./../writelog').writelog;

var Booking = mongoose.model('Booking', new mongoose.Schema({
  registerDate: { type: Date, default: Date.now },
  room: { type: String, required: true },
  bookingDate: { type: String, required: true, unique: true },
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

var bookARoom = function(book, callback){
    validator.checkBooking(book, function(err){
      if(err) {
      if(commonValid.isACallback(callback)){
        callback(err);
      }
    } else {
      var booking = new Booking({
        room: commonValid.prepareForDatabase(book.room),
        bookingDate: commonValid.prepareForDatabase(book.bookingDate),
        user: commonValid.prepareForDatabase(book.user)
      });
      
      booking.save(function(err){
        if(err){
          console.log(err);
          if(commonValid.isACallback(callback))
            callback('Issue when saving new booking to database.');
        } else {
          console.log('New booking added to database');
          if(commonValid.isACallback(callback))
            callback();
        }
      });
    }
    });
};

var bookingTaken = function(booking, callback){
  var TYPE = 'DATABASE VERIFICATIONS';
  
  Booking.find({ room: booking.room, bookingDate: booking.bookingDate }, function(err, results){
    if(err){
      console.log(err);
      if(commonValid.isACallback(callback)){
        callback(err);
      }
      writelog(err, TYPE);
    } else {
      if(commonValid.isACallback(callback))
        callback(null, results.length === 1);
      if(results.length === 1) {
        writelog('Booking is not available for this date/room', TYPE);
      } else {
        writelog('Booking available for this date/room', TYPE);
      }
    }
  })
};

module.exports.bookingTaken = bookingTaken;
module.exports.bookARoom = bookARoom;
module.exports.getBookingByRoom = getBookingByRoom;