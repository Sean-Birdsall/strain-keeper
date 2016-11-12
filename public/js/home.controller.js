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
    home.homeStrains = home.homeStrains.filter(function(entry) {
      var previous;
      home.allDupes = [];

     // Have we seen this label before?
     if (seen.hasOwnProperty(entry.dataName)) {
         // Yes, grab it and add this data to it
         previous = seen[entry.dataName];
         previous.goodEffects.push(entry.goodEffects);
         previous.rating.push(entry.rating);
         home.allDupes.push(previous)
         // Don't keep this entry, we've merged it into the previous one
         return false;
     }

     // entry.data probably isn't an array; make it one for consistency
     if (!Array.isArray(entry.rating)) {
       entry.rating = [entry.rating];
     }

     // Remember that we've seen it
     seen[entry.dataName] = entry;

     // Keep this one, we'll merge any others that match into it
     return true;
 });

      console.log(home.allDupes);

      for (var i = 0; i < home.homeStrains.length; i++){

      home.homeStrains[i].avgRating = home.homeStrains[i].rating.reduce(function(a, b){return a+b;}, 0) / home.homeStrains[i].rating.length;
      console.log(home.homeStrains[i].name, home.homeStrains[i].goodEffects, home.homeStrains[i].rating, home.homeStrains[i].avgRating);
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
