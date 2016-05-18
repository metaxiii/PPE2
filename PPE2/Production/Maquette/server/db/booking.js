var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/booking');

var Booking = mongoose.model('Booking', new mongoose.Schema({
  bookingDate: { type: Date, default: Date.now },
  room: { type: String, required: true }
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  user: { type: String }
}));

