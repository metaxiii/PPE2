var commonValid = require('./common');
var Booking = require('./../db/booking');
var writelog = require('./../common/writelog').writelog;

var checkARoom = function(room) {
    if(!room) {
        var err = 'No room object is given';
        
        console.log(err);
        return err;
    } else if (room !== 'amphitheater' && room !== 'meeting' && room !== 'friendly') {
        var err = 'Unknown room';
        
        console.log(err);
        return err;
    } else {
        return true;
    }
}

var checkRoom = function(room, callback) {
    var TYPE = 'ROOM VERIFICATIONS';
    var res = checkARoom(room);
    if(res === true){
        if(commonValid.isACallback(callback)){
            callback();
        }
    } else {
        if(commonValid.isACallback(callback)){
            callback(res);
        }
        
        writelog(res, TYPE);
    }
};

var checkBooking = function(book, callback){
    var TYPE = 'BOOKING VERIFICATIONS';
    if(!book) {
        var err = 'No booking object is given';
            
        console.log(err);
        if(commonValid.isACallback(callback)){
            callback(err);
        }
        
        writelog(err, TYPE);
    } else if (!book.bookingDate){
        var err = 'No bookingDate field in booking object'
        
        console.log(err);
        if(commonValid.isACallback(callback)){
            callback(err);
        }
        
        writelog(err, TYPE);
    } else if (!book.user){
        var err = 'No user field in booking object';
        
        console.log(err);
        if(commonValid.isACallback(callback)){
            callback(err);
        }
        
        writelog(err, TYPE);
    } else {
        var res = checkARoom(book.room);
        
        if(res === true){
            Booking.bookingTaken(book, function(err, results){
                if(err){
                    console.log(err);
                    if(commonValid.isACallback(callback))
                        callback(err);
                    
                    writelog(err, TYPE);
                } else {
                    if(results === true){
                        callback('This combination of room/date is already taken', TYPE);
                    } else {
                        callback();
                    }
                }
            })
        } else {
            if(commonValid.isACallback(callback)){
                callback(res);
            }
        
            writelog(res, TYPE);
        }
    }
};

module.exports.checkBooking = checkBooking;
module.exports.checkRoom = checkRoom;