'use strict';

angular.module('serieFrontendApp')
  .controller('ProfileCtrl', function ($scope,$http,GooglePlus,$cookieStore, Auth,$rootScope,$state) {
       $scope.currentUser=Auth.currentUser();
       $scope.currentPage=0;
       console.log($scope.currentUser);
       if($scope.currentUser.calendarID != -1){
          console.log($scope.currentUser.calendarID);
          $scope.hasCalendar=true;                    
        }else{
          $scope.hasCalendar=false;
        }
      function init(mode) {
               var scopes = ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/calendar'];
        gapi.client.setApiKey('AIzaSyCt0yTDMy4ks5yzHFD80wI9Pc-hQbDOrV4');
        gapi.auth.authorize({client_id: "149439254149-9u3dae6ug4qjsl6blhplgeq5sjbh5od0.apps.googleusercontent.com", scope: scopes, immediate: false},function(message){
                if (message && !message.error) {
          //Create calendar
          if(mode == 0){
            $scope.mode=0;
            gapi.client.load('calendar', 'v3').then(createCalendar);
          }else{
            //Update calendar
            if(mode == 1){
              $scope.mode=1;
               gapi.client.load('calendar', 'v3').then(deleteCalendar);
               /*$http.get('http://127.0.0.1:5000/api/getFavoritesEpisodes/'+$scope.currentUser.id).success(function(episodes) {
                episodes=episodes.results;
                mySyncFunction(0,episodes);
              });*/
            }else{
              $scope.mode=0;
              gapi.client.load('calendar', 'v3').then(deleteCalendar);
            }
          }
        } else {
          console.log(message.error);
        }
        });
      }
      function createCalendar(){
        var request = gapi.client.calendar.calendars.insert({
          'summary': 'Series App Calendar'
        });
        request.then(function(response) {
          response.body=JSON.parse(response.body);
          $scope.currentUser.calendarID=response.body.id;
          $cookieStore.remove("token");
          $cookieStore.put("token", $scope.currentUser);
          $scope.hasCalendar=true;
          var json={"userID":$scope.currentUser.id,"calendarID":$scope.currentUser.calendarID}
          $http.post('http://flask-aritzbi.rhcloud.com/api/registerCalendar',json).success(function(message) {
            console.log(message);
              if($scope.mode == 1){
               $http.get('http://flask-aritzbi.rhcloud.com/api/getFavoritesEpisodes/'+$scope.currentUser.id).success(function(episodes) {
                episodes=episodes.results;
                mySyncFunction(0,episodes);
              });
            }
          });
        }, function(reason) {
          console.log('Error: ' + reason.result.error.message);
        });
      }

      function deleteCalendar(){
        var request = gapi.client.calendar.calendars.delete({
          'calendarId': $scope.currentUser.calendarID
        });
        request.then(function(response) {
          $scope.currentUser.calendarID=-1;
          $scope.hasCalendar=false;
          $cookieStore.remove("token");
          $cookieStore.put("token", $scope.currentUser);
          var json={"userID":$scope.currentUser.id}
          $http.post('http://flask-aritzbi.rhcloud.com/api/removeCalendar',json).success(function(message) {
            console.log(message);
            if($scope.mode == 1){
              gapi.client.load('calendar', 'v3').then(createCalendar);
            }
          });
          console.log(response);
        }, function(reason) {
          console.log('Error: ' + reason.result.error.message);
        });
      }
      $scope.useAPI=function(mode){
        init(mode);
      };
      $scope.logout=function(){
        Auth.logout();
        $state.go("home");
      }
      function ISODateString(d){
 function pad(n){return n<10 ? '0'+n : n}
 return d.getUTCFullYear()+'-'
      + pad(d.getUTCMonth()+1)+'-'
      + pad(d.getUTCDate())+'T'
      + pad(d.getUTCHours())+':'
      + pad(d.getUTCMinutes())+':'
      + pad(d.getUTCSeconds())+'Z'}
function mySyncFunction (counter, episodes){
   if(counter === undefined) 
     counter = 0;   
   if(counter >=episodes.length) return;
    console.log(episodes);

    var date=episodes[counter].firstAired.$date;
    var start=new Date(date);
    console.log(start);
    start=ISODateString(start);
    console.log(start);
    var end=new Date(date+3600000);
    end=ISODateString(end);
    var name=episodes[counter].episode_name;
    var serie_name=episodes[counter].serie_name;
    console.log(date);
    console.log(name);
    gapi.client.load('calendar', 'v3', function(){
      console.log(start);
      console.log(name);
      var request = gapi.client.calendar.events.insert({
           "end": {
            "dateTime": end
          },
          "start": {
            "dateTime": start
          },
          "description": serie_name+": "+name,
          "calendarId":$scope.currentUser.calendarID,
          "summary": serie_name+": "+name
      });
        request.then(function(response) {
          console.log(response);
        }, function(reason) {
          console.log('Error: ' + reason.result.error.message);
        });
        counter++;
        mySyncFunction(counter, episodes);
    });
  }

     // snip // your code here
});

