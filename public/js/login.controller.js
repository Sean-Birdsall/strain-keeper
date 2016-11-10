angular.module('strainKeeper')
  .controller('loginController', loginController);

loginController.$inject = ['usersFactory'];

function loginController(usersFactory) {
  var login = this;

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
