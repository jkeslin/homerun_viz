'use strict';

/**
 * @ngdoc function
 * @name longballDataVizApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the longballDataVizApp
 */
longballApp
  .controller('MainCtrl', ['d3', 'crossfilter', '$scope', '$rootScope', 'ndxFactory', function (d3, crossfilter, $scope, $rootScope, ndxFactory) {
    

  	$scope.longballsReady = false;

  	$scope.$on('ndxReady', function() {
	  	$scope.longballNdx = ndxFactory.getNdx();
  		$scope.longballsReady = true;
  	})



  }]);
