angular.module('strainKeeper')
  .controller('loginController', loginController);

loginController.$inject = ['usersFactory', '$http', '$location'];

function loginController(usersFactory, $http, $location) {
  var login = this;

  $http.get('/api/me')
    .then(function(res){
      if (res.data){
          // THIS CREATES A RE-DIRECT LOOP if there is no session
          $location.url('/profile')
      }

    }, function(err){
      if (err){
        console.log(err);
      }
    })

  login.newUser = {};

  login.auth = function() {
    // console.log("Trying to log-in from login controller");
    // Calls the auth function in the factory passing the email and password as arguments to use in factory
    usersFactory.auth(login.email, login.password);
  }

  login.register = function() {
    // Calls the register function in the factory
    usersFactory.register(login.newUser);
  }
}
