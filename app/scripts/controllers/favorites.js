'use strict';

/**
 * @ngdoc function
 * @name serieFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the serieFrontendApp
 */
angular.module('serieFrontendApp')
  .controller('FavoritesCtrl', function ($scope,$http,Auth) {
  	$scope.currentUser=Auth.currentUser();
  	$scope.searchText = "";
  	$scope.imageURL="http://flask-aritzbi.rhcloud.com/";
  		//$http.get('http://pythontest-aritzbi.rhcloud.com/api/series').success(function(series) {
	$http.get('http://flask-aritzbi.rhcloud.com/api/getFavorites/'+$scope.currentUser.id).success(function(series) {
		var series=series.results;
		if($scope.currentUser)
			for(var i=0;i<series.length;i++){
				var favorited_by=series[i].favorited_by;
				var found=false;
				for (var j=0;j<favorited_by.length && !found;j++){
					if(favorited_by[j]==$scope.currentUser.id){
						series[i].favorited=true;
						found=true;
					}
				}
			}
		console.log(series);
		$scope.series=series;
	});
	$http.get('http://flask-aritzbi.rhcloud.com/api/getTimeForFavorites/'+$scope.currentUser.id).success(function(series) {
		console.log(series);
	});
	$scope.checkCalendar = function () {
		
    };

  });
