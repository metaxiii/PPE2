export default ['ConnectivityService', function(ConnectivityService){
  const self = this;

  const register = function(){
    // TODO: add verifications and callback
    ConnectivityService.registerUser();
  }

  self.register = register;
}];