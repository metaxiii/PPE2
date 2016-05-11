export default ['AuthService', '$state', function(AuthService, $state){
	let isConnected = AuthService.getAuth();

	const self = this;

	const connect = () => {
		console.log('connecting')
		if(!self.isConnected){
			AuthService.connect()
				.then(function(){
					self.isConnected = true;
				}, function(){
					console.error('Login failed, invalid credentials.')
				})
		}
	};

	const disconnect = () => {
		AuthService.disconnect();
		$state.go('index.info');
	};

	self.connect = connect;
	self.isConnected = isConnected;
	self.disconnect = disconnect;
}];