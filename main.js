angular.module('strainKeeper', ['checklist-model'])
  .controller('mainController', mainController);

function mainController() {
  var main = this;

  // GOOD EFFECTS USERS CAN CHOOSE FROM ADD NEW STRAIN FORM
  main.effects = [
    'Happy',
    'Hungry',
    'Energetic',
    'Relaxed',
    'Creative',
    'Euphoric',
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
  function NewStrain(name, type, rating, goodEffects, badEffects) {
    this.name = name;
    this.type = type;
    this.rating = rating;
    this.goodEffects = goodEffects;
    this.badEffects = badEffects;
  }

  // CREATE REFERENCE TO ARRAY IN STORAGE
  var arrayFromStorage = JSON.parse(localStorage.getItem('strainArray'));
  console.log(arrayFromStorage);

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

  // ARRAY WHERE THE NEW STRAINS WILL BE KEPT
  // main.strainArray = [
  //   {
  //   name: 'Blue Dream',
  //   type: 'Hybrid',
  //   rating: 3,
  //   goodEffects: ['Happy', 'Creative', 'Energetic'],
  //   badEffects: ['Red Eyes']
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

  // FUNCTION CALLED WHEN SAVE BUTTON IN MODAL IS CLICKED
  main.addStrain = function() {
    $('#myModal').modal('hide');

    // INSTANTIATE A NEW STRAIN FROM CONSTRUCTOR
    var newStrain = new NewStrain(main.strain, main.type, main.rating, main.goodEffects, main.badEffects);

    // PUSH THE NEW STRAIN OBJECT ONTO THE STRAIN ARRAY
    main.strainArray.push(newStrain);

    // SORT ARRAY BY RATING
    main.strainArray.sort(function(obj1, obj2){
      return obj2.rating - obj1.rating;
    });

    // SEND ARRAY TO LOCAL STORAGE - OVERRIDES PREVIOUS ARRAY IN STORAGE WITH SAME NAME
    localStorage.setItem('strainArray', JSON.stringify(main.strainArray));
    // var arrayFromStorage = localStorage.getItem('strainArray');
    // console.log('arrayFromStorage: ', JSON.parse(arrayFromStorage));
    // console.log(main.strainArray);

    // IF THE STRAIN ARRAY HAS ITEMS SET VARIABLE TO TRUE FOR NG-SHOW
    if (main.strainArray.length > 0) { main.isThereStrains = true; }

    // RESET ALL STRAIN VALUES
    main.strain = '';
    main.type = '';
    main.rating = 0;
    main.goodEffects = [];
    main.badEffects = [];
  }

}
