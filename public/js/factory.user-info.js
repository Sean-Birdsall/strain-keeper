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
              });
    },

    register: function(newUser) {

        return $http.post('/register', newUser)
          .then(function(res){
            userData = res.data;
            $location.url('/profile');
          }, function(err){
            console.log(err);
          });
    },

    getUserData: function() {

      // var idToGet;
      //
      // $http.get('/api/me')
      //   .then(function(res) {
      //      idToGet = res.data;
      //
      //     $http.get(`/user?id=${idToGet}`)
      //        .then(function(res){
      //          console.log('Getting User Data For Profile');
      //          currentUser = res.data;
      //          console.log('User Data Retrieved:', currentUser);
      //          currentUser;
      //        }, function(err){
      //          if (err){
      //            console.log(err);
      //          }
      //        })
      //   }, function(err) {
      //     if (err){
      //       console.log(err);
      //     }
      //   })

    },

    userProfile: currentUser
  }
}
