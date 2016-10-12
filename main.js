angular.module('strainKeeper', ['checklist-model'])
  .controller('mainController', mainController);

function mainController() {
  var main = this;

  main.effects = [
    'Happy',
    'Hungry',
    'Sleepy',
    'Relaxed',
    'Creative',
    'Euphoric'
  ]

  main.negEffects = [
    'Dry Mouth/Eyes',
    'Paranoid',
    'Anxious'
  ]

  main.goodEffects = [];
  main.badEffects = [];

  main.addStrain = function() {
    $('#myModal').modal('hide');
    $(".strainList").append("<div class='strain'><h1>" + main.strain + "</h1><h3>" + main.type + "</h3>" +
    "<div class='eff'><h5>The Good:</h5><aside>" + main.goodEffects + "</aside><h5 class='neg'>The Bad:</h5>" +
    "<aside>" + main.badEffects + "</aside></div>");
    if (main.rating == 5) {
        $('.strain:last-child').append("<img src='cannabis1.svg'><img src='cannabis1.svg'>" +
                                      "<img src='cannabis1.svg'><img src='cannabis1.svg'><img src='cannabis1.svg'>");
    } else if (main.rating == 4) {
        $('.strain:last-child').append("<img src='cannabis1.svg'><img src='cannabis1.svg'><img src='cannabis1.svg'><img src='cannabis1.svg'>");
    } else if (main.rating == 3) {
        $('.strain:last-child').append("<img src='cannabis1.svg'><img src='cannabis1.svg'><img src='cannabis1.svg'>");
    } else if (main.rating == 2) {
        $('.strain:last-child').append("<img src='cannabis1.svg'><img src='cannabis1.svg'>");
    } else {
      $('.strain:last-child').append("<img src='cannabis1.svg'>");
    }
}
}
