var writelog = require('./../common/writelog').writelog;

var User = require('./../db/user');
var Booking = require('./../db/booking');

module.exports = function(app) {
    // Login
    app.post('/login', function(req, res){
    var TYPE = 'LOGIN REQUEST';
    writelog('Request recieved, args: ' + JSON.stringify(req.body), TYPE);
    User.login(req.body.credentials, function(err, result){
        if(err){
            res.send({fault: err});
            writelog(err + ' send to FE', TYPE);
        } else {
            console.log('User ' + req.body.credentials.mail + ' logged in.')
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
}