angular.module('strainKeeper', ['checklist-model', 'ngRoute']);

angular.module('strainKeeper')
    .config(myRouter);

    myRouter.$inject = ['$routeProvider'];

    function myRouter($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: '../templates/home.html'
            })
            .when('/login', {
                templateUrl: '../templates/login.html',
                controller: "loginController as login"
            })
            .when('/profile', {
                templateUrl: '../templates/profile.html',
                controller: "mainController as main"
            })
            .otherwise({
                redirectTo: '/'
            })
    }
