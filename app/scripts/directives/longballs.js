'use strict';

/**
 * @ngdoc directive
 * @name longballDataVizApp.directive:longballs
 * @description
 * # longballs
 */
longballApp
  .directive('longballs', ['ndxFactory', '$rootScope', function (ndxFactory, $rootScope) {
    return {
      restrict: 'E',
      scope: {
      	ndx: '='
      },
      link: function link(scope, element, attrs) {
        
      	var width = 1400;
      	var height = 800;


      	function cpy(d) {
      		// return y(d.maxHeight*2)
      		return d.maxHeight*2 //without scaling for now
      	}

      	function cpx(d) {
      		// return x(cpy(d) / Math.tan(d.launchAngle))
      		return cpy(d) / Math.tan(d.launchAngle)  //without scaling for now
      	}

      	var data = ndxFactory.getData();

      	var base = d3.select('longballs')

      	function maxDistance () {
      		return d3.max(data, function(d) { return d.distance; });
      	}

      	function maxHeight () {
      		return d3.max(data, function(d) { return d.maxHeight; });
      	}

      	var x = d3.scale.linear()
      				.domain([0, maxDistance()])
      				.range([0, width])

      	var y = d3.scale.linear()
      				.domain([maxHeight()*2, 0])
      				.range([0, height])

      	
      	function parabola(d) {
      		var paraPoints = buildPointsArray(d)
      		return lineFunction(paraPoints);
      	}

      	var lineFunction = d3.svg.line()
      				.x(function(d) { return x(d.x); })
      				.y(function(d) { return y(d.y); })
      				.interpolate('linear');

      	function bezierX(d, t) {
      		var i = (t / 1000)
      		return ( (1 - i)*(i*cpx(d) + 0) + i*((1-i)*cpx(d) + i*d.distance) ); 
      	}

      	function bezierY(d, t) {
      		var i = (t / 1000);
      		return ( (1 - i)*(i*cpy(d) + 0) + i*((1-i)*cpy(d) + 0) ); 
      	}

      	function buildPointsArray(d) {
      		var points = [];
      		for(var t = 0; t < 1000; t++) {
      			points.push({ x: bezierX(d, t), y: bezierY(d, t) })
      		}
      		return points;
      	}



      	var svg = base.append('svg')
		      		.attr('width', width)
		      		.attr('height', height);

		    var homerun = svg.selectAll('.homerun')
		      		.data(data)	
		      		.enter().append('g')
			      		.attr('class', 'homerun')
			    			.attr('transform', 'translate(0, 0)')

      	var ballPath = homerun.append('path')
      					.attr('class', 'ballPath')
								.attr('d', parabola)
								.attr('stroke', 'blue')
								.attr('stroke-width', 1)
								.attr('fill', 'none');

			// debugger;
			// scope.$apply();

      }
    };
  }]);
