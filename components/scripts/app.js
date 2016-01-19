//#1
 var Firebase = require('firebase');
 var angular = require("angular");
 require("angular-animate/angular-animate");
 require('angular-route/angular-route');
 require('ng-dialog');
 require('angular-sanitize');
 require('angularfire');

 //npm install
 require('angular-aria');
 //require('angular-messages');
 //require('angular-material');

 //module.exports = 'ngMaterial';
//alert('helload');
//alert('hi')


var spAcessLan = angular.module('spAcessLan', [
  'ngRoute', 'ngDialog', 'ngSanitize', 'firebase', 'ngAria'
])
.constant('FIREBASE_URL', 'https://spacessivelfire.firebaseio.com/')
.filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    }
}]);




spAcessLan.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $locationProvider.hashPrefix('!');

  $routeProvider.
  when('/', {
    templateUrl: 'views/home.html',
    controller: 'spBase'
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

//TRATA O MATERIAL QUE SERÁ VISTO NA SEÇÃO BLOG
spAcessLan.filter('viewBlog', ['$sce', function($sce){
  return function(val)
  {
    val = val.replace('Continue reading on Medium »', '');

    val = val.substring(0, 32);

    //val = val + ' (..)<a target="_blank" href="{{feed.link}}"><i class="fa fa-external-link"></i>';
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

      //postsRef.remove();

      var newPostRef = postsRef.push();
      // we can also chain the two calls together
      postsRef.push().set({
       name: user.name,
       email: user.email
      });

    } // register
  };

}]); //factory
