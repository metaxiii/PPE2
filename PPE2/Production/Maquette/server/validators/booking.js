var commonValid = require('./common');

var checkRoom = function(room, callback) {
    if(!room) {
        var err = 'No room object is given';
        
        console.log(err);
        if(commonValid.isACallback(callback)){
            callback(err);
        }
    } else if (room !== 'amphitheater' && room !== 'meeting' && room !== 'friendly') {
        var err = 'Unknown room';
        
        console.log(err);
        if(commonValid.isACallback(callback)){
            callback(err);
        }
    } else {
        callback();
    }
};

module.exports.checkRoom = checkRoom;