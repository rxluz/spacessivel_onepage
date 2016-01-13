//#2
spAcessLan
.controller('spBase', ['$scope', '$http', 'ngDialog', function($scope, $http, ngDialog) {


  $http.get('js/infos.json').success(function (response){
    $scope.social=response.social;
    $scope.videoSP =response.videoSP;
    $scope.aboutUs =response.aboutUs;
    $scope.blog =response.blog;
    $scope.links =response.links;
  });

  $scope.eml=
  {
    "nme"   : "",
    "email" : "",
    "send"  : false
  };

  //$scope.emailForm=[];


  $scope.emailSave = function(emailForm){
    //alert();
    if (emailForm.$valid)
    {
      $scope.message = $scope.eml.nme+', obrigado pela sua inscrição.';
      //$scope.eml.nme="";
      //$scope.eml.email="";
      $scope.eml.send=true;
    }else{
      $scope.message = 'Ops, algo deu errado, verifique os campos marcados em vermelho';
    }

  };


}]);
