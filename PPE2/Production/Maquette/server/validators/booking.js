var commonValid = require('./common');

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
    var res = checkARoom(room);
    if(res === true){
        if(commonValid.isACallback(callback)){
            callback();
        }
    } else {
        if(commonValid.isACallback(callback)){
            callback(res);
        }
    }
};

var checkBooking = function(book, callback){
    if(!book) {
        var err = 'No booking object is given';
            
        console.log(err);
        if(commonValid.isACallback(callback)){
            callback(err);
        }
    } else if (!book.bookingDate){
        var err = 'No bookingDate field in booking object'
        
        console.log(err);
        if(commonValid.isACallback(callback)){
            callback(err);
        }
    } else {
        var res = checkARoom(book.room);
        
        if(res === true){
            if(commonValid.isACallback(callback)){
                callback();
            }
        } else {
            if(commonValid.isACallback(callback)){
                callback(res);
            }
        }
    }
};

module.exports.checkBooking = checkBooking;
module.exports.checkRoom = checkRoom;