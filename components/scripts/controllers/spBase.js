//#2
spAcessLan
.controller('spBase', ['$scope', '$http', 'ngDialog', 'FeedService', '$sce', 'Authentication', function($scope, $http, ngDialog, Feed, $sce, Authentication) {


  //CARREGA AS INFORMAÇOES DO ARQUIVO INFOS JSON (TEMPLATE)
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

  });

  $scope.eml=
  {
    "nme"   : "",
    "email" : "",
    "send"  : false
  };


  //SALVA O EMAIL DO USUARIO
  $scope.emailSave = function(emailForm){
    //alert();
    if (emailForm.$valid)
    {
      // auth.$createUser({
      //   email: user.email,
      //   password: user.password
      // }).then(function(regUser) {
      //
      //   var regRef = new Firebase(FIREBASE_URL + 'users')
      //   .child(regUser.uid).set({
      //     date: Firebase.ServerValue.TIMESTAMP,
      //     regUser: regUser.uid,
      //     firstname: user.firstname,
      //     email:  user.email
      //   }); //user info
      Authentication.register({
        email: $scope.eml.email,
        name: $scope.eml.nme
      });

      $scope.message = $scope.eml.nme+', obrigado pela sua inscrição.';
      //$scope.eml.nme="";
      //$scope.eml.email="";
      $scope.eml.send=true;


    }else{
      $scope.message = 'Ops, algo deu errado, verifique os campos marcados em vermelho';
    }

  };


}]);
