'use strict';
angular.module('serieFrontendApp')
  .controller('EpisodesCtrl', function ($scope,$http,$stateParams,$filter) {
  	$scope.imageURL="http://127.0.0.1:5000/";
	//$http.get('http://pythontest-aritzbi.rhcloud.com/api/episodes/'+$stateParams.id).success(function(episodes) {
	$scope.numberSeasons=0;
	var zeroTemp=false;
	$scope.currentPage=0;
	var orderBy = $filter('orderBy');
	$scope.episodesBySeason=[];
	$scope.order = function () {
	   	$scope.episodes = orderBy($scope.episodes, ('combined_season','combined_episodenumber'));
	};
	$http.get('http://flask-aritzbi.rhcloud.com/api/episodes/'+$stateParams.id).success(function(episodes) {
		$scope.episodes=episodes.results;
		console.log(episodes);
		for(var i=0;i<$scope.episodes.length;i++){
			$scope.episodes[i].combined_season=parseInt($scope.episodes[i].combined_season);
			if($scope.episodes[i].combined_season == 0){
				zeroTemp=true;
			}
			if($scope.episodes[i].overview){
            	$scope.episodes[i].hasOverview=true;
            }else{
            	$scope.episodes[i].hasOverview=false;
            }
			$scope.episodes[i].combined_episodenumber=parseInt($scope.episodes[i].combined_episodenumber);
			if($scope.episodesBySeason[$scope.episodes[i].combined_season] == undefined){
				$scope.episodesBySeason[$scope.episodes[i].combined_season]=new Array();
				$scope.numberSeasons++;
			}
			$scope.episodesBySeason[$scope.episodes[i].combined_season].push($scope.episodes[i])
		}
		if (zeroTemp)
			$scope.numberSeasons=$scope.numberSeasons-1;
		$scope.order();
	});

	//$http.get('http://pythontest-aritzbi.rhcloud.com/api/series/'+$stateParams.id).success(function(series) {
	$http.get('http://flask-aritzbi.rhcloud.com/api/series/'+$stateParams.id).success(function(series) {
		$scope.serie=series.results[0];
		console.log(series);
	});


	$scope.range = function (start, end) {
	        var ret = [];
	        if (!end) {
	            end = start;
	            start = 0;
	        }
	        for (var i = start; i < end; i++) {
	            ret.push(i);
	        }
	        return ret;
	};
	    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
	    
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.numberSeasons - 1) {
            $scope.currentPage++;
        }
    };
	    
    $scope.setPage = function () {
        $scope.currentPage = this.n;
        console.log($scope.currentPage);
    }; 
 	$scope.arePages = function(){
		if($scope.filteredItems.length === 0){
			return true;
		}else{
			return false;
		}
	}      
  });
