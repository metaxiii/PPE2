var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var PORT = process.env.PORT || 1000;
var app = express();

mongoose.connect('mongodb://localhost/ppe2');

var User = require('./server/db/user');
var Booking = require('./server/db/booking');

// Used for production build
// app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

// Login
app.post('/login', function(req, res){
   User.login(req.body.credentials, function(err, result){
       if(err){
           res.send({fault: err});
       } else {
           console.log('User ' + req.body.credentials.mail + ' logged in.')
           res.send({return: true});
       }
   }) 
});

// Register a new user
app.post('/user', function(req, res){
    User.registerUser(req.body.newUser, function(err){
        if(err){
            res.send({fault: err});
        } else {
            res.send({return: true});
        }
    });
});

// Get the booking for a room
app.get('/roomBooking', function(req, res) {
   Booking.getBookingByRoom(req.body.room, function(err, result) {
        if(err) {
            res.send({fault: err});
        } else {
            res.send({return: result});
        }
   }); 
});

// Book a room
app.post('/roomBooking', function(req, res){
    Booking.bookARoom(req.body.book, function(err, result) {
        if(err) {
            res.send({fault: err});
        } else {
            res.send({return: true});
        }
    })
})

app.all('*', function(req, res){
    res.send('' +
    '<!DOCTYPE html>' +
    '<html>' +
        '<head>' +
            '<meta charset="utf-8" />' +
            '<title>Maison des ligues de lorraine</title>' +
            '<base href="/" />' +
        '</head>' +
        '<body>' +
            '<md-content>' +
                '<div ui-view class="container"></div>' +
                '<script src="bundle.js"></script>' +
            '</md-content>' +
        '</body>' +
    '</html>')
});

app.listen(PORT, function(){
    console.log("Server running on " + PORT);
});