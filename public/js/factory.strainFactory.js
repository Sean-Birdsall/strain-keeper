angular.module('strainKeeper')
  .factory('strainFactory', strainFactory);

  strainFactory.$inject = ['$http'];

  function strainFactory($http) {

    // var homeStrains = [];

    // $http.get('/strains')
    //   .then(function(res) {
    //     console.log(res.data);
    //     homeStrains = res.data;
    //     console.log('homeStrains are:', homeStrains);
    // }, function(err) {
    //     console.error(err);
    // });

    return {

      getStrains: function(){
        return $http.get('/strains');
      }

    }

  }
