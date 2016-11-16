angular.module('strainKeeper')
  .controller('mainController', mainController);

mainController.$inject = ['usersFactory', '$http', '$location'];


function mainController(usersFactory, $http, $location) {

  var main = this;

  // FIND OUT ABOUT THE USER WHO LOGGED IN
  var idToGet;

  $http.get('/api/me')
    .then(function(res) {
       idToGet = res.data;

       if (!res.data){
         $location.url('/login')
       }

      $http.get(`/user?id=${idToGet}`)
         .then(function(res){
           main.userData = res.data;
          //  console.log('User Data Retrieved:', main.userData);


  // LOADING GIF WILL ONLY DISPLAY WHEN TRUE
  main.loading = false;

  // EDITING FEATURE VARIABLES
  main.editingName = false;
  main.editingType = false;
  main.editingRating = false;
  main.editingGoodEffects = false;

  // GOOD EFFECTS USERS CAN CHOOSE FROM ADD NEW STRAIN FORM
  main.effects = [
    'Happy',
    'Hungry',
    'Energetic',
    'Relaxed',
    'Creative',
    'Flavorful'
  ]

  // BAD EFFECTS TO CHOOSE FROM ADD NEW STRAIN FORM
  main.negEffects = [
    'Dry Mouth',
    'Red Eyes',
    'Paranoid',
    'Anxious',
    'Tired',
    'Foggy'
  ]

  // CONSTRUCTOR FOR A NEW STRAIN OBJECT
  function NewStrain(name, type, rating, goodEffects, badEffects, dataName, image,
    reviewCount, dataUrl, userId) {
    this.name = name;
    this.type = type;
    this.rating = rating;
    this.goodEffects = goodEffects;
    this.badEffects = badEffects;
    this.strainId = main.userData.strainCount;
    this.dataName = dataName;
    this.image = image;
    this.reviewCount = reviewCount;
    this.dataUrl = dataUrl;
    this.createdBy = userId;
  }

  // CREATE REFERENCE TO ARRAY IN STORAGE
  var arrayFromStorage = main.userData.strainArray;

  // INITIALLY THERE IS(true) OR IS NOT(false) STRAINS FOR NG-SHOW
  main.isThereStrains = true;

  // FILTER OBJECT
  main.strainFilter = {};

  // INITIAL TYPE FILTER IS SET TO ALL
  main.typeFilter = 1;

  ///////////////////////////////////////////////////////////////////////////
  ////////////////////     FUNCTIONS     ////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////
  ////////////////////     ACTIVE TYPE FILTER     ///////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  // FUNCTION TO CHANGE TYPE FILTER
  main.setActive = function($event) {

    // DETERMINE WHICH FILTER IS BEING CLICKED
    var clickedFilter = $event.currentTarget.getAttribute('id');
    switch (clickedFilter) {
      case 'All':
        main.typeFilter = 1;
        break;
      case 'Sativa':
        main.typeFilter = 2;
        break;
      case 'Hybrid':
        main.typeFilter = 3;
        break;
      case 'Indica':
        main.typeFilter = 4;
        break;
      default:
        main.typeFilter = 1;
    }

    // CLICKING ON ANY FILTER EXCEPT 'ALL' WILL FILTER BY THAT STRAIN TYPE
    if (clickedFilter != 'All'){
      main.strainFilter.type = clickedFilter;
    } else {
      // CLICKING ALL WILL RESET THE FILTER
      main.strainFilter.type = '';
    }
  }

  ///////////////////////////////////////////////////////////////////////////
  ////////////////////     GET API DATA     /////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  // GETS CALLED ON NG-CLICK ON SAVE NEW STRAIN BUTTON
  main.getData = function(strainName){

    // SIMPLE FORM VALIDATION
    if (main.strain == undefined) {
      alert("Please enter a strain name. (Preferably a real one)");
    } else if (main.type == undefined) {
      alert("Please select a type.")
    } else if (main.rating == undefined) {
      alert("Please select a rating");
    }
    else {
    main.loading = true;

    $http({
      method: 'GET',

      url: "/api/strains",
      params: {
        q: strainName
      }

    })
      .then(function(res){
        // THIS MAKES SURE THAT THE API DATA EXIST BEFORE THE CONSTRUCTOR IS CALLED
        main.addStrain(res.data.data[0]);
        console.log('Success');
        main.loading = false;
      }, function(err) {
        console.log("API Failure:", err);
      });
    }
  }

  ///////////////////////////////////////////////////////////////////////////
  ////////////////////     ADD STRAIN     ///////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////

  // FUNCTION CALLED WHEN SAVE BUTTON IN MODAL IS CLICKED - ARGUMENT COMES FROM MAIN.GETDATA FUNCTION
  main.addStrain = function(strainData) {
    $('#myModal').modal('hide');

    // ADD ITERATION TO STRAIN COUNT
    main.userData.strainCount++;

try {
    // INSTANTIATE A NEW STRAIN FROM CONSTRUCTOR
    var newStrain = new NewStrain(main.strain, main.type, main.rating,
      main.goodEffects, main.badEffects, strainData.name, strainData.image,
      strainData.reviews.count, strainData.url, main.userData._id);
    }
catch(err) {
  var strainFound = false;
  alert("Strain name not found. Please try again.");
}
    // PUSH THE NEW STRAIN OBJECT ONTO THE STRAIN ARRAY
    if (strainFound != false){

      // CHECK TO SEE IF STRAIN ALREADY EXIST IN USER STRAIN ARRAY
      var doYouAlreadyHaveThat = main.userData.strainArray.find(function(element){ return element.name == newStrain.name});
      // IF IT DOES EXIST ALERT THE USER TO EDIT THE EXISTING STRAIN
      if (doYouAlreadyHaveThat) {
        main.userData.strainCount--;
        alert('You have already tried this strain. Please edit the existing strain.');
      } else {
      // OTHERWISE ADD STRAIN LIKE NORMAL

    main.userData.strainArray.push(newStrain);

    $http.post('/strains', newStrain)
      .then(
        function(response){
          console.log('Sent new strain to strain database');
        },
        function(err){
          console.error('post strain error:', err);
        });
      }
    }

    main.sortAndSave();

    // IF THE STRAIN ARRAY HAS ITEMS SET VARIABLE TO TRUE FOR NG-SHOW
    if (main.userData.strainArray.length > 0) { main.isThereStrains = true; }

    // RESET STRAIN VALUES
    main.strain = '';
    main.type = '';
    main.rating = 0;
    main.goodEffects = [];
    main.badEffects = [];
  }

  ///////////////////////////////////////////////////////////////////////////
  ////////////////////     EDIT-IN-PLACE FUNCTIONS    ///////////////////////
  ///////////////////////////////////////////////////////////////////////////

  // Function to hide text when being edited
    main.hideText = function($event, $index) {

        // Reference the element node that was clicked
        var clickedElementNode = $event.currentTarget.nodeName;

        switch (clickedElementNode) {
          case 'H1':
            main.editingName = true;

            main.delayNameGrab = function(){
              var clickedInput = document.getElementsByName('name')[$index];
              clickedInput.focus();
            }
            var timeoutID = window.setTimeout(main.delayNameGrab, 0);

            break;
          case 'H2':
            main.editingType = true;

            main.delayTypeGrab = function(){
              main.clickedInput = document.getElementsByName('type')[$index];
              main.clickedInput.focus();
            }
            var timeoutID = window.setTimeout(main.delayTypeGrab, 0);

            break;
          case 'H3':
          main.editingRating = true;

          main.delayRatingGrab = function(){
            main.clickedInput = document.getElementsByName('rating')[$index];
            main.clickedInput.focus();
          }
          var timeoutID = window.setTimeout(main.delayRatingGrab, 0);


        }
      }

      main.blurText = function($event) {
        // Reference which element is being blurred by name of each element
        var blurredElement = $event.currentTarget.getAttribute('name');
        // Switch statement to take appropriate action depending on which element is being blurred

        switch (blurredElement){
            case 'name':
                main.editingName = false;
                break;
            case 'type':
                main.editingType = false;
                break;
            case 'rating':
                main.editingRating = false;

        }
      }

      main.editStrainDB = function($event) {
        var updatedStrain = main.userData.strainArray.find(function(element){
          return element.name == $event.srcElement.dataset.name;
        });

        console.log(updatedStrain);


        $http.put('/strains', updatedStrain)
          .then(function(response){
            console.log('StrainDB update request sent');
          }, function(err){
            console.log(err);
          })
      }

      //////////////////////////////////////////////////////////////////////////
      ////////////////////     SORT AND SAVE     ///////////////////////////////
      //////////////////////////////////////////////////////////////////////////

      // FUNCTION SORTS THE ARRAY BASED ON RATING AND SAVES IT TO LOCAL STORAGE
      main.sortAndSave = function() {

        // SORT ARRAY BY RATING
          main.userData.strainArray.sort(function(obj1, obj2){
            return obj2.rating - obj1.rating;
          });

        // 'PUT' REQUEST HERE TO SEND DATA TO BACK-END
        $http.put('/users', main.userData)
          .then(
            function(response){
              console.log('Strain Update Request Sent by sortAndSave Function');
            },
            function(err){
              if (err) {
                console.log(err);
              }
            }
          );

      }

      //////////////////////////////////////////////////////////////////////////
      ////////////////////     DELETE STRAIN    ////////////////////////////////
      //////////////////////////////////////////////////////////////////////////

      main.trashStrain = function($event) {
        var shouldDelete = confirm("Are you sure you want to delete strain?");
        if (shouldDelete) {

        // GRABS FOUR DIGIT ID #'S - CAN HOLD 9999 STRAINS WITHOUT PROBLEM
        var strainToTrash = $event.path[4].getAttribute('id').charAt(5) +
          $event.path[4].getAttribute('id').charAt(6) +
          $event.path[4].getAttribute('id').charAt(7) +
          $event.path[4].getAttribute('id').charAt(8);

        var modalToClose = "#modal" + strainToTrash;

        // CLOSE MODAL BASED ON STRAINID AFTER STRAIN IS DELETED
        $(modalToClose).modal('hide');

        // FILTER RETURNS ALL OBJECTS THAT DO NOT MATCH THE STRAINID OF THE DELETED STRAIN
        var remainingStrains = main.userData.strainArray.filter(function(e){

          if (e.strainId != strainToTrash) {
            console.log(e);
            return true;
          } else {
            main.strainToDelete = e.name;
            console.log(main.strainToDelete);
            main.strainCreatedBy = e.createdBy;
            console.log(main.strainCreatedBy);

            return false;
          }

        })

        $http.delete(`/strains?strainToDelete=${main.strainToDelete}&strainCreatedBy=${main.strainCreatedBy}`)
          .then(function(response){
              console.log('Delete request was successful', response);
            }, function(err){
              console.log('Error with delete request:', err);
            });

        main.userData.strainArray = remainingStrains;

        main.sortAndSave();



      }
      }
}, function(err){
  if (err){
    console.log(err);
    $location.url('/login')
  }
})
}, function(err){
  if(err){
    console.log(err);
    $location.url('/login')
  }
})


}
