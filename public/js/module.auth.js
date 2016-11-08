angular.module('module.login', [])
  .controller('loginController', loginController);

loginController.$inject = ['$http'];

function loginController($http) {
  var login = this;

  login.newUser = {};

  login.auth = function() {
    console.log(login);

            $http({
                method: 'POST',
                url: '/login',
                data: {
                    email: login.email,
                    password: login.password
                }
            }).then(function(res) {
                console.info(res.data);
                location.href = '/profile.html';
            }, function(err) {
                // DO NOT FORGET!!!! an error callback
                // when things go bad, you need this!!!!!!!!
                console.error(err);
            });
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
