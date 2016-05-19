export default ['$http', ($http) => {
  const registerUser = function(param){
    // TODO: add callback
    $http.post('/user', { newUser: param });
  }

  return {
    registerUser: registerUser
  }
}];