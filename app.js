var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);



//routes
weatherApp.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        .when('/forecast', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })
        .when('/forecast/:days', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })

});

//services allows you to share data information between different controllers

weatherApp.service('cityService', function () {

    this.city = "new york, NY";

})


// Controllers
weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {

    $scope.city = cityService.city

    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    });



}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function ($scope, $resource, $routeParams, cityService) {

    $scope.city = cityService.city

    $scope.days = $routeParams.days || '2';

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
        callback: "JSON_CALLBACK"
    }, {
        get: {
            method: "JSONP"
        }
    });


    $scope.weatherResult = $scope.weatherAPI.get({
        q: $scope.city,
        cnt: $scope.days,
        APPID: '...'
    });

    $scope.convertToFahrenheit = function (degrees) {
        return Math.round((1.8 * (degrees - 273)) + 32);
    };

    $scope.convertToDate = function (date) {
        return new Date(date * 1000);
    };

}]);