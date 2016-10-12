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
    'Euphoric'
  ]

  // BAD EFFECTS TO CHOOSE FROM ADD NEW STRAIN FORM
  main.negEffects = [
    'Dry Mouth',
    'Red Eyes',
    'Paranoid',
    'Anxious',
    'Tired'
  ]

  // INITIALLY THERE IS NO STRAINS FOR NG-SHOW
  main.isThereStrains = false;

  // CONSTRUCTOR FOR A NEW STRAIN OBJECT
  function NewStrain(name, type, rating, goodEffects, badEffects) {
    this.name = name;
    this.type = type;
    this.rating = rating;
    this.goodEffects = goodEffects;
    this.badEffects = badEffects;
  }

  // FILTER
  main.strainFilter = {};

  // EMPTY ARRAY WHERE THE NEW STRAINS WILL BE PUSHED
  main.strainArray = [];

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

    // CLICKING ON ANY FILTER BUT ALL WILL FILTER BY THAT STRAIN TYPE
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
    localStorage.setItem('newStrain', JSON.stringify(newStrain));

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
