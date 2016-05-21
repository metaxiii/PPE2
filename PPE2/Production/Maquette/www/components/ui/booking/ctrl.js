import amphitheatre from './../../../img/amphi.jpg' ;
import conviv from './../../../img/conviv.jpg' ; 
import reunion from './../../../img/reunion.jpg' ; 

export default function(){
	const self = this ;
	
	self.conviv = conviv ;
	self.reunion = reunion ; 
	self.amphitheatre = amphitheatre ;
	
	// const showBookingDialog = (room) => {
	// 	let dialogController = ['$mdDialog', 'room', function($mdDialog, room) {
	// 		self.room = room;
			
	// 		self.cancel = function(){
	// 			$mdDialog.hide();
	// 		};
	// 	}]
	// 	$mdDialog.show({
	// 		template: 	'<md-dialog flex>' +
	// 						'<md-dialog-content layout="column">' +
	// 							'<h3>{{room}}</h3>' +
	// 							'<label>Date de réservation</label>' +
	// 							'<md-datepicker ng-model="bookingDate"></md-datepicker>' +
	// 						'</md-dialog-content>' +
	// 					'</md-dialog>',
	// 		locals: {
	// 			room: room
	// 		},
	// 		controller: dialogController
	// 	})
	// };
	
	// self.showBookingDialog = showBookingDialog;
};