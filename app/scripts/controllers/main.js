'use strict';

/**
 * @ngdoc function
 * @name serieFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the serieFrontendApp
 */
angular.module('serieFrontendApp')
  .controller('MainCtrl', function ($scope, Auth,mySocket,$http) {
  	$scope.imageURL="http://flask-aritzbi.rhcloud.com";
  	$scope.currentUser=Auth.currentUser();
  	$http.get('http://flask-aritzbi.rhcloud.com/api/seriesCarousel').success(function(series) {
		var series=series.results;
		$scope.slides = series;
		console.log(series);
	});
    $scope.myInterval = 5000;
  });
