//#2
spAcessLan
.controller('spBase', ['$scope', '$http', 'ngDialog', 'FeedService', '$sce', function($scope, $http, ngDialog, Feed, $sce) {


  $http.get('js/infos.json').success(function (response){
    $scope.social=response.social;
    $scope.videoSP =response.videoSP;
    $scope.aboutUs =response.aboutUs;
    //$scope.blog =response.blog;
    $scope.links =response.links;
    //console.log("init: "+$scope.social.blog.feed);

    Feed.parseFeed($scope.social.blog.feed).then(function(res){
      //$scope.loadButonText=angular.element(e.target).text();
      //alert('hi');
      //console.log("during: "+$scope.social.blog.feed);
      $scope.feeds=res.data.responseData.feed.entries;
    });


    //console.log("end: "+$scope.social.blog.feed);

    //alert($scope.social.blog.feed);
  });

  $scope.eml=
  {
    "nme"   : "",
    "email" : "",
    "send"  : false
  };

  //alert('hi');









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
