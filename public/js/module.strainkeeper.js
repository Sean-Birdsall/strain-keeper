angular.module('strainKeeper', ['checklist-model', 'ngRoute']);

angular.module('strainKeeper')
    .config(myRouter);

    myRouter.$inject = ['$routeProvider'];

    function myRouter($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: '../templates/home.html',
                controller: "homeController as home"
            })
            .when('/login', {
                templateUrl: '../templates/login.html',
                controller: "loginController as login"
            })
            .when('/profile', {
                templateUrl: '../templates/profile.html',
                controller: "mainController as main"
            })
            .when('/explore', {
                templateUrl: '../templates/explore.html',
                controller: "homeController as home"
            })
            .otherwise({
                redirectTo: '/'
            })
    }
