angular.module('strainKeeper')
  .factory('strainFactory', strainFactory);

  strainFactory.$inject = ['$http'];

  function strainFactory($http) {

    return {

      getStrains: function(){
        return $http.get('/strains');
      }

    }

  }
