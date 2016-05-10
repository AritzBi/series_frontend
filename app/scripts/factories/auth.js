'use strict';

angular.module('serieFrontendApp')
  .factory('Auth', function Auth( $rootScope,$cookieStore) {
    
    // Get currentUser from cookie
    $rootScope.currentUser = $cookieStore.get('token') || null;
    console.log($rootScope.currentUser);
    return {
      logout: function(callback) {
        var cb = callback || angular.noop;
        $rootScope.currentUser = null;
        $cookieStore.remove('token');
      },
      isLoggedIn: function() {
        console.log("llamo");
        var user = $rootScope.currentUser;
        return !!user;
      },
      currentUser: function(){
        return $rootScope.currentUser;
      },
      loginUser:function(){
        $rootScope.currentUser = $cookieStore.get('token') || null;
      }
    };
  });