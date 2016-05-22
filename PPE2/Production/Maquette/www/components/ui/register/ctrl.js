import sha256 from 'crypto-js/sha256';

export default ['AuthService', '$state', function(AuthService, $state){
  const self = this;
  
  if(AuthService.getAuth())
		$state.go('index.info');

  const register = function(){
    self.registerError = '';

    // TODO: add verifications
    let newUser = {
      nickname: self.user.nickname,
      name: self.user.name,
      mail: self.user.mail,
      password: '' + sha256(self.user.password),
      adress: {
        street: '' + self.streetNumber + ' ' + self.streetName,
        zip: self.user.adress.zip,
        town: self.user.adress.town,
        country: self.user.adress.country
      }
    }
    
    AuthService.registerUser(newUser)
      .then(function(){
        $state.go('index.booking');
      }, function(err){
        self.registerError = err;
      });
  }
  
  const countries = ['France', 'Great Britain', 'Deutschland', 'Luxembourg' , 'Italy', 'Espana', 'Portugal'];
  
  self.countries = countries;
  self.register = register;
}];