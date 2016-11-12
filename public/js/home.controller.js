angular.module('strainKeeper')
  .controller('homeController', homeController);

homeController.$inject = ['strainFactory'];

function homeController(strainFactory) {
  var home = this;
  home.greeting = "WTF!";
  home.displayStrains = [];
  home.allStrains = [];
  var viewWidth = $(window).width();

    strainFactory.getStrains()
    .then(function(res) {
      home.allStrains = res.data;
      home.homeStrains = res.data;

      home.filteredStrains = [];

      var seen = {};
    home.homeStrains = home.homeStrains.filter(function(strain) {
      var previous;

     // Have we seen this strain before?
     if (seen.hasOwnProperty(strain.dataName)) {
         // Yes, grab it and add this data to it
         previous = seen[strain.dataName];
         for (var i = 0; i < strain.goodEffects.length; i++){
           previous.goodEffects.push(strain.goodEffects[i]);
        }
         previous.rating.push(strain.rating);
         // Don't keep this strain, we've merged it into the previous one
         return false;
     }

     // strain.rating probably isn't an array; make it one for consistency
     if (!Array.isArray(strain.rating)) {
       strain.rating = [strain.rating];
     }

     // Remember that we've seen it
     seen[strain.dataName] = strain;

     // Keep this one, we'll merge any others that match into it
     return true;
 });

      // Create an avgRating property on each strain using reduce function
      for (var i = 0; i < home.homeStrains.length; i++){
        home.homeStrains[i].avgRating = home.homeStrains[i].rating.reduce(function(a, b){return a+b;}, 0) / home.homeStrains[i].rating.length;
        console.log(home.homeStrains[i].name,
          home.homeStrains[i].goodEffects,
          home.homeStrains[i].rating,
          home.homeStrains[i].avgRating);

        home.homeStrains[i].goodEffects.forEach(function(element){

        })
      }

      // if statement to deteremine how many strains to show on landing page depending on device width
      if (viewWidth < 675) {

        for (var i = 0; i < 3; i++){
          var displayStrain = home.homeStrains.splice(getRandomInt(0, home.homeStrains.length), 1);
          home.displayStrains.push(displayStrain[0]);
        }

      } else if (viewWidth < 1335) {

        for (var i = 0; i < 6; i++){
          var displayStrain = home.homeStrains.splice(getRandomInt(0, home.homeStrains.length), 1);
          home.displayStrains.push(displayStrain[0]);
        }

      } else if (viewWidth < 1650) {

        for (var i = 0; i < 8; i++){
          var displayStrain = home.homeStrains.splice(getRandomInt(0, home.homeStrains.length), 1);
          home.displayStrains.push(displayStrain[0]);
        }

      } else {

        for (var i = 0; i < 10; i++){
          var displayStrain = home.homeStrains.splice(getRandomInt(0, home.homeStrains.length), 1);
          home.displayStrains.push(displayStrain[0]);
        }

      }

  }, function(err) {
      console.error(err);
  });


  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }









}
