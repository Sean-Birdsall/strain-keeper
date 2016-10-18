angular.module('strainKeeper', ['checklist-model'])
  .controller('mainController', mainController);

mainController.$inject = ['$http'];

function mainController($http) {
  var main = this;


// GETS CALLED ON NG-CLICK ON SAVE NEW STRAIN BUTTON
main.getData = function(strainName){

  $http({
    method: 'GET',
    url: "https://www.cannabisreports.com/api/v1.0/strains/search/:" + strainName,
    headers: {
      'X-API-Key': '40564bdd11accde2290fbd5ea668cc7d7c17707b'
    }
  })
    .then(function(res, status){
      // THIS MAKES SURE THAT THE API DATA EXIST BEFORE THE CONSTRUCTOR IS CALLED
       main.addStrain(res.data.data[0]);
    }, function(res, status) {
      console.log("API Failure:", status);
    });

}

  // IF THERE IS STRAINS TO START GET COUNT FROM STORAGE - COUNT USED TO MANAGE STRAIN ID'S
  var countFromStorage = JSON.parse(localStorage.getItem('strainCount'));
  if (countFromStorage != null) {
    main.strainCount = countFromStorage;
  } else {
    main.strainCount = 0;
  }

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
    reviewCount, dataUrl) {
    this.name = name;
    this.type = type;
    this.rating = rating;
    this.goodEffects = goodEffects;
    this.badEffects = badEffects;
    this.strainId = main.strainCount;
    this.dataName = dataName;
    this.image = image;
    this.reviewCount = reviewCount;
    this.dataUrl = dataUrl;
  }

  // CREATE REFERENCE TO ARRAY IN STORAGE
  var arrayFromStorage = JSON.parse(localStorage.getItem('strainArray'));

  //IF ARRAY IN STORAGE EXIST, THEN STRAINARRAY
  if (arrayFromStorage != null) {
    main.strainArray = arrayFromStorage;
    console.log("I got it from storage");
  } else {
    main.strainArray = [];
    console.log("There was nothing in storage");
  }

  // INITIALLY THERE IS(true) OR IS NOT(false) STRAINS FOR NG-SHOW
  main.isThereStrains = true;

  // FILTER OBJECT
  main.strainFilter = {};

  // ARRAY FOR TESTING PURPOSES - NEEDS STRAIN IDS
  // main.strainArray = [
  //   {
  //   name: 'Blue Dream',
  //   type: 'Hybrid',
  //   rating: 3,
  //   goodEffects: ['Happy', 'Creative', 'Energetic'],
  //   badEffects: ['Red Eyes'],
  //
  // }, {
  //   name: 'Gorilla Glue',
  //   type: 'Indica',
  //   rating: 4,
  //   goodEffects: ['Relaxed', 'Euphoric'],
  //   badEffects: ['Tired']
  // }, {
  //   name: 'Jedi Kush',
  //   type: 'Indica',
  //   rating: 4,
  //   goodEffects: ['Happy', 'Hungry'],
  //   badEffects: ['Tired']
  // }, {
  //   name: 'Matanuska Thunder Fuck',
  //   type: 'Sativa',
  //   rating: 4,
  //   goodEffects: ['Happy', 'Hungry'],
  //   badEffects: ['Dry Mouth']
  // }, {
  //   name: 'Flo',
  //   type: 'Sativa',
  //   rating: 3,
  //   goodEffects: ['Energetic', 'Hungry'],
  //   badEffects: ['Red Eyes']
  // }, {
  //   name: 'Girl Scout Cookies',
  //   type: 'Hybrid',
  //   rating: 2,
  //   goodEffects: ['Happy', 'Relaxed'],
  //   badEffects: ['Anxious']
  // },
  //
  // ];

  // INITIAL TYPE FILTER IS SET TO ALL
  main.typeFilter = 1;

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

  // FUNCTION CALLED WHEN SAVE BUTTON IN MODAL IS CLICKED - ARGUMENT COMES FROM MAIN.GETDATA FUNCTION
  main.addStrain = function(strainData) {
    $('#myModal').modal('hide');

    // ADD ITERATION TO STRAIN COUNT
    main.strainCount++;

    // SEND THE STRAIN COUNT LOCAL STORAGE - THIS COULD ALSO BE ACCOMPLISHED WITH MAIN.STRAINARRAY.LENGTH
    localStorage.setItem('strainCount', JSON.stringify(main.strainCount));

    // INSTANTIATE A NEW STRAIN FROM CONSTRUCTOR
    var newStrain = new NewStrain(main.strain, main.type, main.rating,
      main.goodEffects, main.badEffects, strainData.name, strainData.image,
      strainData.reviews.count, strainData.url);

    // PUSH THE NEW STRAIN OBJECT ONTO THE STRAIN ARRAY
    main.strainArray.push(newStrain);

    // SORT ARRAY BY RATING
    main.strainArray.sort(function(obj1, obj2){
      return obj2.rating - obj1.rating;
    });

    // SEND ARRAY TO LOCAL STORAGE - OVERRIDES PREVIOUS ARRAY IN STORAGE WITH SAME NAME
    localStorage.setItem('strainArray', JSON.stringify(main.strainArray));

    // IF THE STRAIN ARRAY HAS ITEMS SET VARIABLE TO TRUE FOR NG-SHOW
    if (main.strainArray.length > 0) { main.isThereStrains = true; }

    // RESET STRAIN VALUES
    main.strain = '';
    main.type = '';
    main.rating = 0;
    main.goodEffects = [];
    main.badEffects = [];
  }

  // Function to hide text when being edited
    main.hideText = function($event) {

        // Reference the element node that was clicked
        var clickedElementNode = $event.currentTarget.nodeName;
        console.log(clickedElementNode);
        switch (clickedElementNode) {
          case 'H1':
            main.editingName = true;

            main.delayNameGrab = function(){
              main.clickedInput = document.getElementsByName('name')[0];
              main.clickedInput.focus();
            }
            var timeoutID = window.setTimeout(main.delayNameGrab, 0);

            break;
          case 'H2':
            main.editingType = true;

            main.delayTypeGrab = function(){
              main.clickedInput = document.getElementsByName('type')[0];
              main.clickedInput.focus();
            }
            var timeoutID = window.setTimeout(main.delayTypeGrab, 0);

            break;
          case 'H3':
          main.editingRating = true;

          main.delayRatingGrab = function(){
            main.clickedInput = document.getElementsByName('rating')[0];
            main.clickedInput.focus();
          }
          var timeoutID = window.setTimeout(main.delayRatingGrab, 0);


        }
      }

      main.blurText = function($event) {
        // Reference which element is being blurred by name of each element
        var blurredElement = $event.currentTarget.getAttribute('name');
        // Switch statement to take appropriate action depending on which element is being blurred
        console.log(blurredElement);
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
      // FUNCTION SORTS THE ARRAY BASED ON RATING AND SAVES IT TO LOCAL STORAGE
      main.sortAndSave = function() {

        // SORT ARRAY BY RATING
        main.strainArray.sort(function(obj1, obj2){
          return obj2.rating - obj1.rating;
        });

        // SEND ARRAY TO LOCAL STORAGE - OVERRIDES PREVIOUS ARRAY IN STORAGE WITH SAME NAME
        localStorage.setItem('strainArray', JSON.stringify(main.strainArray));
      }

      main.trashStrain = function($event) {
        var shouldDelete = confirm("Are you sure you want to delete strain?");
        if (shouldDelete) {

        // GRABS THREE DIGIT ID #'S - CAN HOLD 999 STRAINS WITHOUT PROBLEM
        var strainToTrash = $event.path[4].getAttribute('id').charAt(5) +
          $event.path[4].getAttribute('id').charAt(6) +
          $event.path[4].getAttribute('id').charAt(7);
        console.log(strainToTrash);

        var modalToClose = "#modal" + strainToTrash;

        // CLOSE MODAL BASED ON STRAINID AFTER STRAIN IS DELETED
        $(modalToClose).modal('hide');

        // FILTER RETURNS ALL OBJECTS THAT DO NOT MATCH THE STRAINID OF THE DELETED STRAIN
        var remainingStrains = main.strainArray.filter(function(e){

          return e.strainId != strainToTrash;

        })
        console.log(main.strainArray);
        console.log(remainingStrains);
        main.strainArray = remainingStrains;

        main.sortAndSave();
      }
      }

}
