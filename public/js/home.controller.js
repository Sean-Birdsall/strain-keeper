angular.module('strainKeeper')
  .controller('homeController', homeController);

homeController.$inject = ['strainFactory'];

function homeController(strainFactory) {
  var home = this;
  // home.greeting = "WTF!";
  home.displayStrains = [];
  // home.allStrains = [];
  var viewWidth = $(window).width();

    strainFactory.getStrains()
    .then(function(res) {
      // home.allStrains = res.data;
      home.homeStrains = res.data;

      // home.filteredStrains = [];

      // Merge and get rid of duplicate strains
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

      // THIS LOOP IS TO ADD RATING AND PERCENTAGE PROPS TO STRAINS
      for (var i = 0; i < home.homeStrains.length; i++){
        // Create an avgRating property on each strain using reduce function
        home.homeStrains[i].avgRating = home.homeStrains[i].rating.reduce(function(a, b){return a+b;}, 0) / home.homeStrains[i].rating.length;

          // Declare new effects objects
          var goodEffectsObj = {
              happy : 0,
              hungry : 0,
              energetic : 0,
              relaxed : 0,
              creative : 0,
              flavorful : 0
            }

            var badEffectsObj = {
                dryMouth : 0,
                redEyes : 0,
                paranoid : 0,
                anxious : 0,
                tired : 0,
                foggy : 0
              }

        // Go through each GOOD effect and add 1 to each variable for each effect
        home.homeStrains[i].goodEffects.forEach(function(element){

          switch (element){
            case "Happy":
              goodEffectsObj.happy++;
              break;
            case "Hungry":
              goodEffectsObj.hungry++;
              break;
            case "Energetic":
              goodEffectsObj.energetic++;
              break;
            case "Relaxed":
              goodEffectsObj.relaxed++;
              break;
            case "Creative":
              goodEffectsObj.creative++;
              break;
            case "Flavorful":
              goodEffectsObj.flavorful++;
              break;
          }
        })

        // Go through each bad effect and add 1 to each variable for each effect
        home.homeStrains[i].badEffects.forEach(function(element){

          switch (element){
            case "Dry Mouth":
              badEffectsObj.dryMouth++;
              break;
            case "Red Eyes":
              badEffectsObj.redEyes++;
              break;
            case "Paranoid":
              badEffectsObj.paranoid++;
              break;
            case "Anxious":
              badEffectsObj.anxious++;
              break;
            case "Tired":
              badEffectsObj.tired++;
              break;
            case "Foggy":
              goodEffectsObj.foggy++;
              break;
          }
        })
                  // Create new properties for effectsValues
                  home.homeStrains[i].goodEffectsValues = goodEffectsObj;
                  home.homeStrains[i].badEffectsValues = badEffectsObj;

                  // Total up the number of good effects that were chosen for that strain
                  var goodEffectsVotes = Object.values(goodEffectsObj).reduce(function(a, b){return a+b;});

                  // Total up the number of bad effects that were chosen for that strain
                  var badEffectsVotes = Object.values(badEffectsObj).reduce(function(a, b){return a+b;});

                  var effectsVotesSum = goodEffectsVotes + badEffectsVotes;

                  // HAVE TO ASSIGN NEW PERCENTAGE PROPERTY TO AN EMPTY OBJECT SO I CAN ASSIGN
                  // ADDITIONAL PROPERTIES TO THAT NEW ONE
                  home.homeStrains[i].effectsPercentage = {};

                  home.homeStrains[i].effectsPercentage.happy = Math.round((home.homeStrains[i].goodEffectsValues.happy/effectsVotesSum)*100);
                  home.homeStrains[i].effectsPercentage.hungry = Math.round((home.homeStrains[i].goodEffectsValues.hungry/effectsVotesSum)*100);
                  home.homeStrains[i].effectsPercentage.energetic = Math.round((home.homeStrains[i].goodEffectsValues.energetic/effectsVotesSum)*100);
                  home.homeStrains[i].effectsPercentage.relaxed = Math.round((home.homeStrains[i].goodEffectsValues.relaxed/effectsVotesSum)*100);
                  home.homeStrains[i].effectsPercentage.creative = Math.round((home.homeStrains[i].goodEffectsValues.creative/effectsVotesSum)*100);
                  home.homeStrains[i].effectsPercentage.flavorful = Math.round((home.homeStrains[i].goodEffectsValues.flavorful/effectsVotesSum)*100);

                  home.homeStrains[i].effectsPercentage.dryMouth = Math.round((home.homeStrains[i].badEffectsValues.dryMouth/effectsVotesSum)*100);
                  home.homeStrains[i].effectsPercentage.redEyes = Math.round((home.homeStrains[i].badEffectsValues.redEyes/effectsVotesSum)*100);
                  home.homeStrains[i].effectsPercentage.paranoid = Math.round((home.homeStrains[i].badEffectsValues.paranoid/effectsVotesSum)*100);
                  home.homeStrains[i].effectsPercentage.anxious = Math.round((home.homeStrains[i].badEffectsValues.anxious/effectsVotesSum)*100);
                  home.homeStrains[i].effectsPercentage.tired = Math.round((home.homeStrains[i].badEffectsValues.tired/effectsVotesSum)*100);
                  home.homeStrains[i].effectsPercentage.foggy = Math.round((home.homeStrains[i].badEffectsValues.foggy/effectsVotesSum)*100);

                  // If no effects are chosen use 1 as default vote value so they width on the chart equals 0%
                  if (home.homeStrains[i].goodEffectsVotes < 1) {home.homeStrains[i].goodEffectsVotes = 1;}
                  if (home.homeStrains[i].badEffectsVotes < 1) {home.homeStrains[i].badEffectsVotes = 1;}
                  // console.log(home.homeStrains[i].goodEffectsValues)
                  // console.log(home.homeStrains[i].badEffectsValues)
                  // console.log('total good effect votes:', home.homeStrains[i].goodEffectsVotes);
      }

      // ASSIGN STRAINS TO DISPLAY TO exploreStrains ARRAY
      home.exploreStrains = [];
      for (var i =0; i < home.homeStrains.length; i++){
        home.exploreStrains.push(home.homeStrains[i]);
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
