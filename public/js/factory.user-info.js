angular.module('strainKeeper')
  .factory('usersFactory', usersFactory);

usersFactory.$inject = ['$http', '$location'];

function usersFactory ($http, $location) {


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
              });
    },

    register: function(newUser) {
        console.log('did we get here?');
        return $http.post('/register', newUser)
          .then(function(res){
            console.log('where is this');
            console.log('res.data from login controller', res.data);
            userData = res.data;
            $location.url('/profile');
          }, function(err){
            console.log(err);
          });
    },

    getUserData: function() {
      return userData;
    }
  }
}
