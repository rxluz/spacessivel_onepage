//#1
 var angular = require("angular");
 require("angular-animate/angular-animate");
 require('angular-route/angular-route');
 require('ng-dialog');

 //npm install
 //require('angular-aria');
 //require('angular-messages');
 //require('angular-material');

 //module.exports = 'ngMaterial';
//alert('helload');
//alert('hi')


var spAcessLan = angular.module('spAcessLan', [
  'ngRoute', 'ngDialog'
]);


spAcessLan.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'views/home.html',
    controller: 'spBase'
  }).
  when('/video', {
    templateUrl: 'views/video.html',
    controller: 'spVideo'
  }).
  otherwise({
    redirectTo: '/'
  });
}]);
