angular.module('strainKeeper')
  .controller('loginController', loginController);

loginController.$inject = ['usersFactory', '$http'];

function loginController(usersFactory, $http) {
  var login = this;

  login.greeting = "Hello Squirrel";

  login.newUser = {};

  login.auth = function() {
    console.log("Trying to log-in from login controller");
    // Calls the auth function in the factory passing the email and password as arguments to use in factory
    usersFactory.auth(login.email, login.password);
  }

  login.register = function() {
    $http.post('/register', login.newUser)
      .then(function(res){
        console.log(res.data);

    }, function(err){
      console.log(err);
    });
  }
}
