'use strict';

/**
 * @ngdoc service
 * @name longballDataVizApp.ndxFactory
 * @description
 * # ndxFactory
 * Service in the longballDataVizApp.
 */
longballApp
  .factory('ndxFactory', ['d3', 'crossfilter', '$rootScope', function (d3, crossfilter, $rootScope) {
    
    var formattedData;
  	var ndx;

    var dateFormat = d3.time.format('%x');

    function degToRad(angle) {
      return angle * (Math.PI / 180)
    }

    function formatData(data) {
      data.forEach(function(d){
        d.batter = d.Batter;
        d.pitcher = d.Pitcher;
        d.distance = +d['Distance (feet) '];
        d.maxHeight = +d['Height (feet)'];
        d.launchSpeed = +d['Launch Speed (mph)'];
        d.pitchSpeed = +d['Pitch Speed (mph)'];
        d.date = dateFormat.parse(d.Date);
        var angleInDeg = +d['Launch Angle (deg)'];
        d.launchAngle = degToRad(angleInDeg);
      })
      return data;
    }

    d3.csv('HR_data.csv', function(returnData){
      formattedData = formatData(returnData);
      ndx = crossfilter(formattedData);
      $rootScope.$broadcast('ndxReady');
    })



    return {
    	getNdx: function() {
    		return ndx;
    	},

      getData: function() {
        return formattedData;
      }
    }
  
  }]);
