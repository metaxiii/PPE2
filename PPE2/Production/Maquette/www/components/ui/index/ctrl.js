import sha256 from 'crypto-js/sha256';

export default ['AuthService', '$state', '$timeout', function(AuthService, $state, $timeout){
	let isConnected = AuthService.getAuth();

	const self = this;

	const connect = () => {
		// TODO: close only if connected
		self.connexionError = '';
		if(!self.isConnected && self.credentials && self.credentials.mail && self.credentials.password){
			let encryptedPassword = '' + sha256(self.credentials.password);
			var userCred = {
				mail: self.credentials.mail,
				password: encryptedPassword
			};
			AuthService.connect(userCred)
				.then(function(){
					// Time for the pop up to disapear
					$timeout(() => {
						self.isConnected = true;
						self.credentials = {};
					}, 200);
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
}];