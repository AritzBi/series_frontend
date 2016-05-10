'use strict';

angular.module('serieFrontendApp')
  .controller('LoginCtrl', function ($scope,$http,GooglePlus,$cookieStore, Auth,$state,$location) {
  	  	$scope.currentUser=Auth.currentUser();

  	    $scope.loginGoogle = function () {
        GooglePlus.login().then(function (authResult) {
            GooglePlus.getUser().then(function (user) {
                var json={'user_id':user.id};
                $http.post('http://flask-aritzbi.rhcloud.com/api/registerUser',json).success(function(answer) {
                  user.calendarID=answer.calendarID;
                  user.series=answer.series;
                  console.log(user.series);
                  $cookieStore.put("token", user);
                  Auth.loginUser();
                  console.log(answer);
                  console.log(user);
                  $state.go("profile");
                  //$location.path('profile');
                });
            });
        }, function (err) {
            console.log(err);
        });


    };
  });
