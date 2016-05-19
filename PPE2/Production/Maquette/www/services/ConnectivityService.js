export default ['$http', ($http) => {
  const registerUser = function(param){
    return $http.post('/user', { newUser: param });
  }
  
  const login = function(param) {
    return $http.post('/login', { credentials: param });
  }

  return {
    registerUser: registerUser,
    login: login
  }
}];