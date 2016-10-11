angular.module('strainKeeper', [])
  .controller('mainController', mainController);

function mainController() {
  var main = this;
  main.showStrains = false;
  main.addStrain = function() {
    $('#myModal').modal('hide');
    $("#strainList").append("<div class='strain'><h1>" + main.strain + "</h1><h3>" + main.type + "</h3></div>");
    if (main.rating == 5) {
        $('.strain:last-child').append("<img src='cannabis1.svg'><img src='cannabis1.svg'><img src='cannabis1.svg'><img src='cannabis1.svg'><img src='cannabis1.svg'>");
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
