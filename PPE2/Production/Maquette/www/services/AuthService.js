export default ['ConnectivityService', '$q', (ConnectivityService, $q) => {
	let isAuth = false;

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
					if(data.return === true){
						console.log('Logged in');
						resolve();
						isAuth = true;
						return;
					}
				})
		});
	};

	const disconnect = () => {
		isAuth = false;
	};

	const getAuth = () => {
		return isAuth;
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
					resolve();
					return;
				}
			})
		});
	}

	return {
		connect: connect,
		disconnect: disconnect,
		getAuth: getAuth,
		registerUser: registerUser
	};
}];