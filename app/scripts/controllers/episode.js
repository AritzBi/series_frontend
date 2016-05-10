'use strict';

angular.module('serieFrontendApp')
  .controller('EpisodeCtrl', function ($scope,Auth,$state,$stateParams,$http) {
    $scope.imageURL="http://flask-aritzbi.rhcloud.com/";
  	  	$scope.currentUser=Auth.currentUser();
          $http.get('http://flask-aritzbi.rhcloud.com/api/episode/'+$stateParams._id).success(function(episode) {
            $scope.episode=episode;
            $scope.episode.date=new Date(episode.firstAired.$date)
            console.log(episode);

  });
  });
