angular.module('strainKeeper')
  .factory('usersFactory', usersFactory);

usersFactory.$inject = ['$http', '$location'];

function usersFactory ($http, $location) {

  var userFact = this;

  var currentUser = {};
  var userData = {};

  return {

    auth: function(loginEmail, loginPassword){
           return $http({
                  method: 'POST',
                  url: '/login',
                  data: {
                      email: loginEmail,
                      password: loginPassword
                  }
              }).then(function(res) {
                  userData = res.data;
                  $location.url('/profile');
              }, function(err) {
                  // DO NOT FORGET!!!! an error callback
                  // when things go bad, you need this!!!!!!!!
                  console.error(err);
                  alert(err.data.message)
              });
    },

    register: function(newUser) {

        return $http.post('/register', newUser)
          .then(function(res){
            userData = res.data;
            $location.url('/login');
            alert('Thank you for Registering, Please Log-in to get started');
          }, function(err){
            console.log(err);
          });
    },

    userProfile: currentUser
  }
}
