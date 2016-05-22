import amphitheatre from './../../../img/amphi.jpg' ;
import conviv from './../../../img/conviv.jpg' ; 
import reunion from './../../../img/reunion.jpg' ; 

export default ['BookingService', function(BookingService){
	const self = this ;
	
	const rooms = [
		'amphitheater',
		'meeting',
		'friendly'
	]
	
	const getBookingDateByRoom = function(room) {
		//TODO
		console.log(room);
	};
	
	const setRoom = function(room) {
	self.room = room;
	};
	
	const bookARoom = function() {
		console.log('ctrl')
		//TODO: callback
		BookingService.bookARoom({
			room: self.room,
			bookingDate: self.bookingDate
		})
	};
	self.setRoom = setRoom;
	self.bookARoom = bookARoom;
	self.getBookingDateByRoom = getBookingDateByRoom;
	self.rooms = rooms;
	self.conviv = conviv ;
	self.reunion = reunion ; 
	self.amphitheatre = amphitheatre ;
}]