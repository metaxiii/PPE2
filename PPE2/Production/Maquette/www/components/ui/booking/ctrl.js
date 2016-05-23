import amphitheatre from './../../../img/amphi.jpg' ;
import conviv from './../../../img/conviv.jpg' ; 
import reunion from './../../../img/reunion.jpg' ; 

export default ['BookingService', 'AuthService', '$state', 
function(BookingService, AuthService, $state){
	const self = this ;
	
	if(!AuthService.getAuth())
		$state.go('index.register');
		
	const rooms = [
		'amphitheater',
		'meeting',
		'friendly'
	];
	
	const getBookingDateByRoom = function(room) {
		//TODO
	};
	
	const setRoom = function(room) {
		self.room = room;
	};
	
	const bookARoom = function() {
		self.result = '';
		BookingService.bookARoom({
			room: self.room,
			bookingDate: self.bookingDate
		})
			.then(() => {
				self.result = 'Salle réservée !';
			}, (err) => {
				self.result = 'Error: ' + err;
			});
	};
	self.setRoom = setRoom;
	self.bookARoom = bookARoom;
	self.getBookingDateByRoom = getBookingDateByRoom;
	self.rooms = rooms;
	self.conviv = conviv ;
	self.reunion = reunion ; 
	self.amphitheatre = amphitheatre ;
}]