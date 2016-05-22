var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var writelog = require('./server/writelog').writelog;

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
   var TYPE = 'LOGIN REQUEST';
   writelog('Request recieved, args: ' + JSON.stringify(req.body), TYPE);
   User.login(req.body.credentials, function(err, result){
       if(err){
           res.send({fault: err});
           writelog(err + ' send to FE', TYPE);
       } else {
           console.log('User ' + req.body.credentials.nickname + ' logged in.')
           res.send({return: true});
           writelog('Sending successful login', TYPE);
       }
   }) 
});

// Register a new user
app.post('/user', function(req, res){
    var TYPE = 'REGISTER REQUEST';
    writelog('Request recieved, args: ' + JSON.stringify(req.body), TYPE);
    User.registerUser(req.body.newUser, function(err){
        if(err){
            res.send({fault: err});
            writelog(err + ' send to FE', TYPE);
        } else {
            res.send({return: true});
            writelog('Sending successful registration', TYPE);
        }
    });
});

// Get the bookings for a room
app.get('/roomBooking', function(req, res) {
    var TYPE = 'GET BOOKING REQUEST';
    writelog('Request recieved, args: ' + JSON.stringify(req.body), TYPE);
   Booking.getBookingByRoom(req.body.room, function(err, result) {
        if(err) {
            res.send({fault: err});
            writelog(err + ' send to FE', TYPE);
        } else {
            res.send({return: result});
            writelog('Sending bookings: ' + JSON.stringify(result), TYPE);
        }
   }); 
});

// Book a room
app.post('/roomBooking', function(req, res){
    var TYPE = 'SET BOOKING REQUEST';
    writelog('Request recieved, args: ' + JSON.stringify(req.body), TYPE);
    Booking.bookARoom(req.body.book, function(err, result) {
        if(err) {
            res.send({fault: err});
            writelog(err + ' send to FE', TYPE);
        } else {
            res.send({return: true});
            writelog('Sending successful booking', TYPE);
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
    var TYPE = 'SERVER START';
    writelog('Server started successfully', TYPE);
    console.log("Server running on " + PORT);
});