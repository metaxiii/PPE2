export default ['ConnectivityService', '$q', function(ConnectivityService, $q) {
    let bookingCollection = [];
    
    const bookARoom = (booking) => {
        return $q((resolve, reject) => {
            // Parsing date
            console.log(booking.bookingDate);
            booking.bookingDate = booking.bookingDate.toDateString();
            console.log(booking.bookingDate);
            ConnectivityService.bookARoom(booking)
                .then(rawData => {
                    let data = rawData.data;
                    if(!data) {
                        let err = 'No answer from server';
						console.error(err);
						reject(err);
						return;
                    }
                    if(data.fault) {
						console.warn(data.fault);
						reject(data.fault);
						return;
					}
                    if(data.return) {
                        //TODO
                        console.log('Room booked');
                        resolve();
                    }
                })
        });
    };
    
    return {
        bookARoom: bookARoom
    };
}];