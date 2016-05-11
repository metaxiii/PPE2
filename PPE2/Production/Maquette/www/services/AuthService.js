export default ['$q', ($q) => {
	let isAuth = false;

	const connect = (credentials) => {
		return $q((resolve, reject) => {
			setTimeout(() => {
				isAuth = true;
				resolve();
			}, 1000);
		});
	};

	const disconnect = () => {
		isAuth = false;
	};

	const getAuth = () => {
		return isAuth;
	};

	return {
		connect: connect,
		disconnect: disconnect,
		getAuth: getAuth
	};
}];