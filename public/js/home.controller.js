angular.module('strainKeeper')
  .controller('homeController', homeController);

homeController.$inject = ['$http', 'strainFactory', 'usersFactory', '$location'];

function homeController($http, strainFactory, usersFactory, $location) {
  var home = this;

  // console.log(home.effectFilter);

  home.dynamicOrder = function() {
    switch(home.effectFilter){
      case 'Uplifting':
        return '-effectsArray[0].percent';
        break;
      case 'Hungry':
        return '-effectsArray[1].percent';
        break;
      case 'Energetic':
        return '-effectsArray[2].percent';
        break;
      case 'Relaxed':
        return '-effectsArray[3].percent';
        break;
      case 'Creative':
        return '-effectsArray[4].percent';
        break;
      case 'Flavorful':
        return '-effectsArray[5].percent';
        break;
      case 'Dry Mouth':
        return '-effectsArray[6].percent';
        break;
      case 'Dry Eyes':
        return '-effectsArray[7].percent';
        break;
      case 'Anxiety':
        return '-effectsArray[8].percent';
        break;
     case 'Lazy':
        return '-effectsArray[9].percent';
        break;
     case 'Tired':
        return '-effectsArray[10].percent';
        break;
     case 'Foggy':
        return '-effectsArray[11].percent';
        break;
    default:
        return '-avgRating'
    }
  }


  home.displayStrains = [];
  // home.allStrains = [];
  var viewWidth = $(window).width();

  $http.get('/api/me')
    .then(function(res){
      if (!res.data){
          home.isThereUser = false;
      } else {
        home.isThereUser = true;
      }

    }, function(err){
      if (err){
        console.log(err);
      }
    })

    strainFactory.getStrains()
    .then(function(res) {
      // home.allStrains = res.data;
      home.homeStrains = res.data;

      // home.filteredStrains = [];

      // Merge and get rid of duplicate strains
      var seen = {};
    home.homeStrains = home.homeStrains.filter(function(strain) {
      var previous;

      home.strainFromDB.rating = 'Click Here to Add Your Rating';

      // Have we seen this strain before?
      if (seen.hasOwnProperty(strain.dataName)) {
         // Yes, grab it and add this data to it
         previous = seen[strain.dataName];
         for (var i = 0; i < strain.goodEffects.length; i++){
           previous.goodEffects.push(strain.goodEffects[i]);
        }
        for (var i = 0; i < strain.badEffects.length; i++){
          previous.badEffects.push(strain.badEffects[i]);
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
// FUNCTION USED IN STRAIN EFFECT ARRAYS TO DETERMINE IF IT IS A POSITIVE OR NEGATIVE EFFECT
 function checkToSeeIfGood(effectName) {
   if (effectName === "Dry Mouth" || effectName === "Dry Eyes" || effectName === "Anxiety" || effectName === "Lazy" || effectName === "Tired" || effectName === "Foggy") {
     return true;
   } else {
     return false;
   }
 }

      // THIS LOOP IS TO ADD AVERAGE RATING AND EFFECTS-ARRAY TO EACH STRAIN
      for (var i = 0; i < home.homeStrains.length; i++){
        // Create an avgRating property on each strain using reduce function
        home.homeStrains[i].avgRating = Math.round( home.homeStrains[i].rating.reduce(function(a, b){return a+b;}, 0) / home.homeStrains[i].rating.length * 10 ) / 10;

          // Declare new effects objects
          var goodEffectsObj = {
              uplifting : 0,
              hungry : 0,
              energetic : 0,
              relaxed : 0,
              creative : 0,
              flavorful : 0
            }

            var badEffectsObj = {
                dryMouth : 0,
                dryEyes : 0,
                anxiety : 0,
                lazy : 0,
                tired : 0,
                foggy : 0
              }

        // Go through each GOOD effect and add 1 to each variable for each effect
        home.homeStrains[i].goodEffects.forEach(function(element){

          switch (element){
            case "Uplifting":
              goodEffectsObj.uplifting++;
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
            case "Dry Eyes":
              badEffectsObj.dryEyes++;
              break;
            case "Anxiety":
              badEffectsObj.anxiety++;
              break;
            case "Lazy":
              badEffectsObj.lazy++;
              break;
            case "Tired":
              badEffectsObj.tired++;
              break;
            case "Foggy":
              badEffectsObj.foggy++;
              break;
          }
        })

                  // Total up the number of good effects that were chosen for that strain
                  var goodEffectsVotes = Object.values(goodEffectsObj).reduce(function(a, b){return a+b;});

                  // Total up the number of bad effects that were chosen for that strain
                  var badEffectsVotes = Object.values(badEffectsObj).reduce(function(a, b){return a+b;});

                  var effectsVotesSum = goodEffectsVotes + badEffectsVotes;

                  var upliftingPercent = Math.round((goodEffectsObj.uplifting/effectsVotesSum)*100);
                  var hungryPercent = Math.round((goodEffectsObj.hungry/effectsVotesSum)*100);
                  var energeticPercent = Math.round((goodEffectsObj.energetic/effectsVotesSum)*100);
                  var relaxedPercent = Math.round((goodEffectsObj.relaxed/effectsVotesSum)*100);
                  var creativePercent = Math.round((goodEffectsObj.creative/effectsVotesSum)*100);
                  var flavorfulPercent = Math.round((goodEffectsObj.flavorful/effectsVotesSum)*100);

                  var dryMouthPercent = Math.round((badEffectsObj.dryMouth/effectsVotesSum)*100);
                  var dryEyesPercent = Math.round((badEffectsObj.dryEyes/effectsVotesSum)*100);
                  var anxietyPercent = Math.round((badEffectsObj.anxiety/effectsVotesSum)*100);
                  var lazyPercent = Math.round((badEffectsObj.lazy/effectsVotesSum)*100);
                  var tiredPercent = Math.round((badEffectsObj.tired/effectsVotesSum)*100);
                  var foggyPercent = Math.round((badEffectsObj.foggy/effectsVotesSum)*100);


                  home.homeStrains[i].effectsArray = [{
                    effectName: 'Uplifting',
                    percent: upliftingPercent,
                    value: goodEffectsObj.uplifting,
                    isBad: checkToSeeIfGood('Uplifting')
                  }, {
                    effectName: 'Hungry',
                    percent: hungryPercent,
                    value: goodEffectsObj.hungry,
                    isBad: checkToSeeIfGood('Hungry')
                  }, {
                    effectName: 'Energetic',
                    percent: energeticPercent,
                    value: goodEffectsObj.energetic,
                    isBad: checkToSeeIfGood('Energetic')
                  }, {
                    effectName: 'Relaxed',
                    percent: relaxedPercent,
                    value: goodEffectsObj.relaxed,
                    isBad: checkToSeeIfGood('Relaxed')
                  }, {
                    effectName: 'Creative',
                    percent: creativePercent,
                    value: goodEffectsObj.creative,
                    isBad: checkToSeeIfGood('Creative')
                  }, {
                    effectName: 'Flavorful',
                    percent: flavorfulPercent,
                    value: goodEffectsObj.flavorful,
                    isBad: checkToSeeIfGood('Flavorful')
                  }, {
                    effectName: 'Dry Mouth',
                    percent: dryMouthPercent,
                    value: badEffectsObj.dryMouth,
                    isBad: checkToSeeIfGood('Dry Mouth')
                  }, {
                    effectName: 'Dry Eyes',
                    percent: dryEyesPercent,
                    value: badEffectsObj.dryEyes,
                    isBad: checkToSeeIfGood('Dry Eyes')
                  }, {
                    effectName: 'Anxiety',
                    percent: anxietyPercent,
                    value: badEffectsObj.anxiety,
                    isBad: checkToSeeIfGood('Anxiety')
                  }, {
                    effectName: 'Lazy',
                    percent: lazyPercent,
                    value: badEffectsObj.lazy,
                    isBad: checkToSeeIfGood('Lazy')
                  }, {
                    effectName: 'Tired',
                    percent: tiredPercent,
                    value: badEffectsObj.tired,
                    isBad: checkToSeeIfGood('Tired')
                  }, {
                    effectName: 'Foggy',
                    percent: foggyPercent,
                    value: badEffectsObj.foggy,
                    isBad: checkToSeeIfGood('Foggy')
                  }
                ];

      }

      // ASSIGN STRAINS TO DISPLAY TO exploreStrains ARRAY
      home.exploreStrains = [];
      for (var i =0; i < home.homeStrains.length; i++){
        home.exploreStrains.push(home.homeStrains[i]);
      }

      // if statement to deteremine how many strains to show on landing page depending on device width
      if (viewWidth < 675) {

        for (var i = 0; i < 2; i++){
          var displayStrain = home.homeStrains.splice(getRandomInt(0, home.homeStrains.length), 1);
          home.displayStrains.push(displayStrain[0]);
        }

      } else if (viewWidth < 1335) {

        for (var i = 0; i < 3; i++){
          var displayStrain = home.homeStrains.splice(getRandomInt(0, home.homeStrains.length), 1);
          home.displayStrains.push(displayStrain[0]);
        }

      } else if (viewWidth < 1650) {

        for (var i = 0; i < 4; i++){
          var displayStrain = home.homeStrains.splice(getRandomInt(0, home.homeStrains.length), 1);
          home.displayStrains.push(displayStrain[0]);
        }

      } else {

        for (var i = 0; i < 5; i++){
          var displayStrain = home.homeStrains.splice(getRandomInt(0, home.homeStrains.length), 1);
          home.displayStrains.push(displayStrain[0]);
        }

      }

  }, function(err) {
      console.error(err);
  });


  ///////////////////////////////////////////////////////////////////////////
  ////////////////////     ACTIVE TYPE FILTER     ///////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  // FILTER OBJECT
  home.strainFilter = {};

  // INITIAL TYPE FILTER IS SET TO ALL
  home.typeFilter = 1;

  // FUNCTION TO CHANGE TYPE FILTER
  home.setActive = function($event) {

    // DETERMINE WHICH FILTER IS BEING CLICKED
    var clickedFilter = $event.currentTarget.getAttribute('id');
    switch (clickedFilter) {
      case 'All':
        home.typeFilter = 1;
        break;
      case 'Sativa':
        home.typeFilter = 2;
        break;
      case 'Hybrid':
        home.typeFilter = 3;
        break;
      case 'Indica':
        home.typeFilter = 4;
        break;
      default:
        home.typeFilter = 1;
    }

    // CLICKING ON ANY FILTER EXCEPT 'ALL' WILL FILTER BY THAT STRAIN TYPE
    if (clickedFilter != 'All'){
      home.strainFilter.type = clickedFilter;
    } else {
      // CLICKING ALL WILL RESET THE FILTER
      home.strainFilter.type = '';
    }
  }


  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }



  ///////////////////////////////////////////////////////////////////////////
  ////////////////////     EDIT-IN-PLACE FUNCTIONS    ///////////////////////
  ///////////////////////////////////////////////////////////////////////////

  // GOOD EFFECTS USERS CAN CHOOSE FROM ADD NEW STRAIN FORM
  home.effects = [
    'Uplifting',
    'Hungry',
    'Energetic',
    'Relaxed',
    'Creative',
    'Flavorful'
  ]

  // BAD EFFECTS TO CHOOSE FROM ADD NEW STRAIN FORM
  home.negEffects = [
    'Dry Mouth',
    'Dry Eyes',
    'Anxiety',
    'Lazy',
    'Tired',
    'Foggy'
  ]

  // Function to hide text when being edited
    home.hideText = function($event, $index) {

        // Reference the element node that was clicked
        var clickedElementNode = $event.currentTarget.nodeName;

        switch (clickedElementNode) {

          case 'H3':
          home.editingRating = true;

          home.delayRatingGrab = function(){
            home.clickedInput = document.getElementsByName('rating')[$index];
            home.clickedInput.focus();
          }
          var timeoutID = window.setTimeout(home.delayRatingGrab, 0);

        }
      }

      home.blurText = function($event) {
        // Reference which element is being blurred by name of each element
        var blurredElement = $event.currentTarget.getAttribute('name');
        // Switch statement to take appropriate action depending on which element is being blurred

        switch (blurredElement){
            case 'rating':
                home.editingRating = false;

        }
      }


  home.strainFromDB = {};

  home.addFromDB = function(strainName, strainType, strainDataName, strainDataUrl, strainImage, strainReviewCount, strain_id) {

    if (home.strainFromDB.rating == 'Click Here to Add Your Rating') {
      alert('Please Add Rating');
    } else {

    $(`#modal${strain_id}`).modal('hide');  

    $http.get('/api/me')
      .then(function(res){
        home.updateId = res.data;

        $http.get(`/user?id=${home.updateId}`)
          .then(function(res){

            var userToUpdate = res.data;

            home.strainFromDB.name = strainName;
            home.strainFromDB.type = strainType;
            userToUpdate.strainCount++;
            home.strainFromDB.strainId = userToUpdate.strainCount;
            home.strainFromDB.dataName = strainDataName;
            home.strainFromDB.image = strainImage;
            home.strainFromDB.dataUrl = strainDataUrl;
            home.strainFromDB.reviewCount = strainReviewCount;
            home.strainFromDB.createdBy = home.updateId;


            // CHECK TO SEE IF STRAIN ALREADY EXIST IN USER STRAIN ARRAY
            var doYouAlreadyHaveThat = userToUpdate.strainArray.find(function(element){ return element.name == home.strainFromDB.name});
            // IF IT DOES EXIST ALERT THE USER TO EDIT THE EXISTING STRAIN
            if (doYouAlreadyHaveThat) {
              alert('You have already tried this strain. Please edit the existing strain.');
            } else {
            // OTHERWISE ADD STRAIN LIKE NORMAL
            userToUpdate.strainArray.push(home.strainFromDB);

            userToUpdate.strainArray.sort(function(obj1, obj2){
              return obj2.rating - obj1.rating;
            });

            $http.post('/strains', home.strainFromDB)
              .then(
                function(response){

                  home.strainFromDB = {};
                },
                function(err){
                  console.error('post strain error:', err);
                });

            $http.put('/users', userToUpdate)
              .then(function(res){

              }, function(err){
                if (err){
                  console.log(err);
                }
              })

              $location.url('#/explore');

            }

          }, function(err){
            if (err){
              console.log(err);
            }
          })

      }, function(err){
        if (err){
          console.log(err);
        }
      })
    }

  }







}
