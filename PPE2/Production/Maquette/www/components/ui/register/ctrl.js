export default ['ConnectivityService', function(ConnectivityService){
  const self = this;

  const register = function(){
    // TODO: add verifications and callback
    self.user.adress.street = `${self.streetNumber} ${self.streetName}`;
    ConnectivityService.registerUser(self.user);
  }
  
  const countries = ['France', 'Great Britain', 'Deutschland', 'Luxembourg' , 'Italy', 'Espana', 'Portugal'];
  
  self.countries = countries;
  self.register = register;
}];