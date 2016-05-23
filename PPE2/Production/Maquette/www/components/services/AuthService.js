export default ['ConnectivityService', '$q', (ConnectivityService, $q) => {
	let auth = false;

	const connect = (credentials) => {
		return $q((resolve, reject) => {
			ConnectivityService.login(credentials)
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
					if(data.return !== false){
						console.log('Logged in');
						auth = credentials.mail;
						resolve();
						return;
					}
				})
		});
	};

	const disconnect = () => {
		auth = false;
	};

	const getAuth = () => {
		return auth !== false;
	};
	
	const registerUser = user => {
		return $q(function(resolve, reject) {
			ConnectivityService.registerUser(user)
			.then(function(rawData){
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
				if(data.return === true){
					console.log('User registered');
					auth = true;
					resolve();
					return;
				}
			})
		});
	};
	
	const getUser = () => {
		return auth;	
	};

	return {
		connect: connect,
		disconnect: disconnect,
		getAuth: getAuth,
		registerUser: registerUser,
		getUser: getUser
	};
}];