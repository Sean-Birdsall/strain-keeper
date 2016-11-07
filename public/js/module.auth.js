angular.module('module.login', [])
  .controller('loginController', loginController);

loginController.$inject = ['$http'];

function loginController($http) {
  var login = this;

  login.newUser = {};

  login.auth = function() {

  }

  login.register = function() {
    $http({
      method: 'POST',
      url: '/register'
    }).then(function(res){
      console.log(res.data);

    }, function(err){
      console.log(err);
    });
  }
}
