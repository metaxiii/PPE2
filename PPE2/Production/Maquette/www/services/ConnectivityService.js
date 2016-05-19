export default ['$http', ($http) => {
  const registerUser = function(param){
    // TODO: add callback
    $http.put('/user', { newUser: param });
  }

  return {
    registerUser: registerUser
  }
}];