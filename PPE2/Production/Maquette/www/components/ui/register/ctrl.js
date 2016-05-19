export default ['AuthService', function(AuthService){
  const self = this;

  const register = function(){
    // TODO: add verifications and callback
    self.user.adress.street = `${self.streetNumber} ${self.streetName}`;
    AuthService.registerUser(self.user)
      .then(function(){
        // TODO: set connected and redirect to login
      }, function(err){
        self.registerError = err;
      });
  }
  
  const countries = ['France', 'Great Britain', 'Deutschland', 'Luxembourg' , 'Italy', 'Espana', 'Portugal'];
  
  self.countries = countries;
  self.register = register;
}];