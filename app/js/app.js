'use strict';


// Declare app level module which depends on filters, and services
angular.module('uiucEmailForm', [
  'ngRoute',
  'ngCookies',
  'firebase',
  'uiucEmailForm.filters',
  'uiucEmailForm.services',
  'uiucEmailForm.directives',
  'uiucEmailForm.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'partials/login.html'
  });
  $routeProvider.when('/', {
    templateUrl: 'partials/main.html',
    resolve: {
      factory: checkLoginStatus
    }
  });
  $routeProvider.otherwise({redirectTo: '/'});
}]);

var checkLoginStatus = function($cookieStore,$location){
  var credentials = $cookieStore.get('credentials');
  if (typeof(credentials) == "undefined"){
    $location.path("/login");
  }

  return true;
};
