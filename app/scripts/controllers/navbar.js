'use strict';

/**
 * @ngdoc function
 * @name serieFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the serieFrontendApp
 */
angular.module('serieFrontendApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth,mySocket,ngToast, $timeout) {
  	//$scope.currentUser=Auth.currentUser();
    $scope.isActive = function(route) {
      return route === $location.path();
    };
    mySocket.on('socket:notification', function (message) {
   		console.log(message);
      message=JSON.parse(message);
      if($scope.currentUser!=undefined){
        for(var i=0;i<message.length;i++){
          if($scope.currentUser.series.indexOf(message[i].serie_id)!=-1){
            console.log(message[i].serie_name);
              ngToast.create({
                content:'<strong>'+message[i].serie_name+'</strong>, episode '+message[i].episode_name+' starts in '+calculateTime(message[i].dif),
                dismissOnTimeout: false,
                dismissButton: true,
                dismissOnClick: false
              });
          }
        }
      }else{
        console.log("No User logged")
      }
  	});

    var calculateTime=function(time){
      var hours = Math.floor(time / 3600);
      time = time - hours * 3600;
      var minutes = Math.floor(time / 60);
      return hours+' hours and '+minutes+' minutes'
    }


});
