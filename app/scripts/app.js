'use strict';

/**
 * @ngdoc overview
 * @name longballDataVizApp
 * @description
 * # longballDataVizApp
 *
 * Main module of the application.
 */
var longballApp = angular.module('longballDataVizApp', 
  [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'd3',
    'crossfilter'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
        // controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('d3', [])
  .service('d3', function(){

    return window.d3;
  })

angular.module('crossfilter', [])
  .service('crossfilter', function(){

    return window.crossfilter;
  })