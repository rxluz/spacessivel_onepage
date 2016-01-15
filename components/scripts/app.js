//#1
 var Firebase = require('firebase');
 var angular = require("angular");
 require("angular-animate/angular-animate");
 require('angular-route/angular-route');
 require('ng-dialog');
 require('angular-sanitize');
 require('angularfire');

 //npm install
 //require('angular-aria');
 //require('angular-messages');
 //require('angular-material');

 //module.exports = 'ngMaterial';
//alert('helload');
//alert('hi')


var spAcessLan = angular.module('spAcessLan', [
  'ngRoute', 'ngDialog', 'ngSanitize', 'firebase'
]).constant('FIREBASE_URL', 'https://spacessivelfire.firebaseio.com/');


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

//TRATA AS STRINGS JSON PARA SEREM PROCESSADAS COMO HTML
spAcessLan.filter('toHtml', ['$sce', function($sce){
  return function(val)
  {
    return $sce.trustAsHtml(val);
  };
}]);



//FIREBASE AUTH
spAcessLan.factory('Authentication',
  ['$rootScope', '$firebaseAuth', '$firebaseObject',
  '$location', 'FIREBASE_URL',
  function($rootScope, $firebaseAuth, $firebaseObject,
    $location, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);

  auth.$onAuth(function(authUser) {
    if (authUser) {
      var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid );
      var userObj = $firebaseObject(userRef);
      $rootScope.currentUser = userObj;
    } else {
      $rootScope.currentUser = '';
    }
  });


  return {
    register: function(user) {
      var regRef = new Firebase(FIREBASE_URL);

      var postsRef = regRef.child("mailling");

      var newPostRef = postsRef.push();
      // we can also chain the two calls together
      postsRef.push().set({
        name: user.name,
        email: user.email
      });

    } // register
  };

}]); //factory
