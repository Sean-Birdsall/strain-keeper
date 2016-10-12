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

  // INITIALLY THERE IS NO STRAINS FOR NG-IF
  main.isThereStrains = false;

  // CONSTRUCTOR FOR A NEW STRAIN OBJECT
  function NewStrain(name, type, rating, goodEffects, badEffects) {
    this.name = name;
    this.type = type;
    this.rating = rating;
    this.goodEffects = goodEffects;
    this.badEffects = badEffects;
  }

  // EMPTY ARRAY WHERE THE NEW STRAINS WILL BE PUSHED
  main.strainArray = [];

  // FUNCTION CALLED WHEN SAVE BUTTON IN MODAL IS CLICKED
  main.addStrain = function() {
    $('#myModal').modal('hide');

    // INSTANTIATE A NEW STRAIN FROM CONSTRUCTOR
    var newStrain = new NewStrain(main.strain, main.type, main.rating, main.goodEffects, main.badEffects);

    // PUSH THE NEW STRAIN OBJECT ONTO THE STRAIN ARRAY
    main.strainArray.push(newStrain);
    console.log(main.strainArray);

    // IF THE STRAIN ARRAY HAS ITEMS SET VARIABLE TO TRUE FOR NG-IF
    if (main.strainArray.length > 0) { main.isThereStrains = true; }

    // RESET ALL STRAIN VALUES
    main.strain = '';
    main.type = '';
    main.rating = 0;
    main.goodEffects = [];
    main.badEffects = [];
  }
}
