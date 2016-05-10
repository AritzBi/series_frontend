'use strict';

/**
 * @ngdoc function
 * @name serieFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the serieFrontendApp
 */
angular.module('serieFrontendApp')
  .controller('SeriesCtrl', function ($scope,$http,Auth,$cookieStore) {
  	$scope.searchText = "";
  	$scope.imageURL="http://flask-aritzbi.rhcloud.com/";
  	$scope.currentUser=Auth.currentUser();
	//$http.get('http://pythontest-aritzbi.rhcloud.com/api/series').success(function(series) {
	$http.get('http://flask-aritzbi.rhcloud.com/api/series').success(function(series) {
		var series=series.results;
		console.log(series);
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
		$scope.series=series;
		console.log(series);
	});

	$scope.addFavorite=function(id){
		var json={'serie_id':id,'user_id':$scope.currentUser.id};
			$http.post('http://flask-aritzbi.rhcloud.com/api/addFavoriteSerie',json).success(function(answer) {
				console.log(answer);
				for(var i=0;i<$scope.series.length;i++){
					if($scope.series[i].id == id){
						$scope.series[i].favorited_by.push($scope.currentUser.id);
						$scope.series[i].favorited=true;
						$cookieStore.remove("token");
						$scope.currentUser.series.push(id);
						console.log($scope.currentUser);
          				$cookieStore.put("token", $scope.currentUser);
          				$scope.hasCalendar=true;
					}
				}
			});
	}
	$scope.removeFavorite=function(id){
		var json={'serie_id':id,'user_id':$scope.currentUser.id};
			$http.post('http://flask-aritzbi.rhcloud.com/api/removeFavoriteSerie',json).success(function(answer) {
					for(var i=0;i<$scope.series.length;i++){
						if($scope.series[i].id == id){
							var index=$scope.series[i].favorited_by.indexOf($scope.currentUser.id);
							$scope.series[i].favorited_by.splice(index,1);
							$scope.series[i].favorited=false;
							index=$scope.currentUser.series.indexOf(id);
							$cookieStore.remove("token");
							$scope.currentUser.series.splice(index,1);
							console.log($scope.currentUser);
          					$cookieStore.put("token", $scope.currentUser);
						}
					}			
				});
	}
});
