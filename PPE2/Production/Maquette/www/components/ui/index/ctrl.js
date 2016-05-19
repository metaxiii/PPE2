export default ['AuthService', '$state', function(AuthService, $state){
	let isConnected = AuthService.getAuth();

	const self = this;

	const connect = () => {
		// TODO: add crypt
		if(!self.isConnected && self.credentials && self.credentials.mail && self.credentials.password){
			AuthService.connect(self.credentials)
				.then(function(){
					self.isConnected = true;
				}, function(err){
					self.connexionError = err;
				})
		}
	};

	const disconnect = () => {
		AuthService.disconnect();
		self.isConnected = false;
		$state.go('index.info');
	};

	self.connect = connect;
	self.isConnected = isConnected;
	self.disconnect = disconnect;
}];