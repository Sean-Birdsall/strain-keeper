angular.module('strainKeeper')
  .controller('homeController', homeController);

homeController.$inject = ['strainFactory'];

function homeController(strainFactory) {
  var home = this;

    strainFactory.getStrains()
    .then(function(res) {
      home.homeStrains = res.data;
  }, function(err) {
      console.error(err);
  });








}
