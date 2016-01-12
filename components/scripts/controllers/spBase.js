//#2
spAcessLan
.controller('spBase', ['$scope', '$http', function($scope, $http) {

  $http.get('js/infos.json').success(function (response){
    $scope.social=response.social;
  });

}]);
