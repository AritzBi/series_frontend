'use strict';

/**
 * @ngdoc overview
 * @name serieFrontendApp
 * @description
 * # serieFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('serieFrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch', 
    'ui.bootstrap',
    'ui.router',
    'googleplus',
    'btford.socket-io',
    'ngToast'
  ])
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('series',{
        url: '/series',
        templateUrl: 'views/series.html',
        controller: 'SeriesCtrl'
      })
      .state('serieInfo',{
        url: '/serieInfo/{id}',
        templateUrl: 'views/episodes.html',
        controller: 'EpisodesCtrl'
      })
      .state('login',{
        url: 'login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('profile',{
        url: 'profile',
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .state('episode',{
        url: 'episode/{_id}',
        templateUrl: 'views/episode.html',
        controller: 'EpisodeCtrl'
      })        
      .state('favorites',{
        url: 'favorites',
        templateUrl: 'views/favorites.html',
        controller: 'FavoritesCtrl'
      });
      $urlRouterProvider.otherwise('/');
  }).factory('mySocket', function (socketFactory) {
 var myIoSocket = io.connect('ws://flask-aritzbi.rhcloud.com:80/test');

  var mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  mySocket.forward('notification');
  return mySocket;
}).directive('disableAnimation', function($animate){
    return {
        restrict: 'A',
        link: function($scope, $element, $attrs){
            $attrs.$observe('disableAnimation', function(value){
                $animate.enabled(!value, $element);
            });
        }
    }
}).config(['GooglePlusProvider', function(GooglePlusProvider) {
     GooglePlusProvider.init({
        clientId: '149439254149-9u3dae6ug4qjsl6blhplgeq5sjbh5od0.apps.googleusercontent.com',
        apiKey: 'AIzaSyCt0yTDMy4ks5yzHFD80wI9Pc-hQbDOrV4'
     });
}]);;