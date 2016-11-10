'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.game',
  'myApp.home',
  'myApp.version',
  'ngAria',
  'ngMaterial',
  'ngConstellation',
  'monospaced.qrcode'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
