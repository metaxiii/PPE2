export default ['ConnectivityService', function(ConnectivityService){
  const self = this;

  const register = function(){
    // TODO: add verifications and callback
    ConnectivityService.registerUser();
  }
  
  const countries = ['France', 'Great Britain', 'Deutschland', 'Luxembourg' , 'Italy', 'Espana', 'Portugal'];
  
  self.countries = countries;
  self.register = register;
}];