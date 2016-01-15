//#1
 var angular = require("angular");
 require("angular-animate/angular-animate");
 require('angular-route/angular-route');
 require('ng-dialog');
 require('angular-sanitize');

 //npm install
 //require('angular-aria');
 //require('angular-messages');
 //require('angular-material');

 //module.exports = 'ngMaterial';
//alert('helload');
//alert('hi')


var spAcessLan = angular.module('spAcessLan', [
  'ngRoute', 'ngDialog', 'ngSanitize'
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



spAcessLan.factory('FeedService',['$http',function($http){
  return {
    parseFeed : function(url){
      return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
    }
  }
}]);


spAcessLan.filter('viewBlog', ['$sce', function($sce){
  return function(val)
  {
    val = val.replace('Continue reading on Medium »', '');
    val = val.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    val = val.substring(0, 32);
    return $sce.trustAsHtml(val);
  };
}]);


spAcessLan.filter('toHtml', ['$sce', function($sce){
  return function(val)
  {
    return $sce.trustAsHtml(val);
  };
}]);
