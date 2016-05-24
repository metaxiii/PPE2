import sha256 from 'crypto-js/sha256';
import m2l_logo from './../../../img/m2l_logo.png' ;

export default ['AuthService', '$state', '$timeout', '$mdMenu',
function(AuthService, $state, $timeout, $mdMenu){
	let isConnected = AuthService.getAuth();

	const self = this;

	const connect = () => {
		self.connexionError = '';
		if(!self.isConnected && self.credentials && self.credentials.mail && self.credentials.password){
			let encryptedPassword = '' + sha256(self.credentials.password);
			var userCred = {
				mail: self.credentials.mail,
				password: encryptedPassword
			};
			AuthService.connect(userCred)
				.then(function(){
					$mdMenu.hide()
					// Time for the pop up to disapear
					$timeout(() => {
						self.isConnected = true;
						self.credentials = {};
					}, 300);
					
					$state.go('index.booking');
				}, function(err){
					self.connexionError = err;
				})
		}
	};

	const disconnect = () => {
		AuthService.disconnect();
		$timeout(() => {
			self.isConnected = false;
		}, 200);
		$state.go('index.info');
	};

	self.connect = connect;
	self.isConnected = isConnected;
	self.disconnect = disconnect;
	self.m2l_logo = m2l_logo;
}];