angular.module('strainKeeper')
  .factory('usersFactory', usersFactory);

usersFactory.$inject = ['$http', '$location'];

function usersFactory ($http) {


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
                  console.log(res.data);
                  userData = res.data;
                  location.href = '/profile.html';
              }, function(err) {
                  // DO NOT FORGET!!!! an error callback
                  // when things go bad, you need this!!!!!!!!
                  console.error(err);
              });
    },

    getUserData: function() {
      return userData;
    }
  }
}
