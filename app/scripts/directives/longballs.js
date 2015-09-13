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
        
        var svgWidth = 1100;
        var svgHeight = 500;

        var margin = {top: 50, right: 50, bottom: 50, left: 50};
      	
        var chartWidth = svgWidth - margin.right - margin.left;
      	var chartHeight = svgHeight - margin.top - margin.bottom;

        var incr = 500;

      	function cpy(d) {
      		return d.maxHeight*2;
      	}

      	function cpx(d) {
      		return cpy(d) / Math.tan(d.launchAngle);
      	}

      	var data = ndxFactory.getData();


        function maxDistance () {
          return d3.max(data, function(d) { return d.distance; });
        }

        function maxHeight () {
          return d3.max(data, function(d) { return d.maxHeight; });
        }

        var x = d3.scale.linear()
              .domain([0, maxDistance()])
              .range([0, chartWidth])

        var y = d3.scale.linear()
              .domain([0, maxHeight()])
              .range([chartHeight, 0])

        var xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom");

        var yAxis = d3.svg.axis()
              .scale(y)
              .orient("left")

        var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([0, 0])
              .html(function(d) {
                return "<strong>Batter:</strong> <span style='color:red'>" + d.batter + "</span>";
              })


        function parabola(d) {
          var paraPoints = buildPointsArray(d)
          return lineFunction(paraPoints);
        }

        var lineFunction = d3.svg.line()
              .x(function(d) { return x(d.x); })
              .y(function(d) { return y(d.y); })
              .interpolate('linear');

        function bezierX(d, t) {
          var i = (t / incr)
          return ( (1 - i)*(i*cpx(d) + 0) + i*((1-i)*cpx(d) + i*d.distance) ); 
        }

        function bezierY(d, t) {
          var i = (t / incr);
          return ( (1 - i)*(i*cpy(d) + 0) + i*((1-i)*cpy(d) + 0) );
        }

        function buildPointsArray(d) {
          var points = [];
          for(var t = 0; t < incr; t++) {
            points.push({ x: bezierX(d, t), y: bezierY(d, t) })
          }
          return points;
        }

      	var base = d3.select('longballs');

        var svg = base.append('svg')
              .attr('width', svgWidth)
              .attr('height', svgHeight);

        var chart = svg.append('g')
              .attr("transform", "translate("+margin.left+"," + margin.top + ")");


            chart.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + chartHeight + ")")
              .call(xAxis);

            chart.append("g")
              .attr("class", "y axis")
              .call(yAxis);

        var homerun = chart.selectAll('.homerun')
              .data(data)
              .enter().append('g')
                .attr('class', 'homerun')

        var ballPath = homerun.append('path')
              .attr('class', 'ballPath')
              .attr('d', parabola)
              .attr('stroke', 'ghostwhite')
              .attr('stroke-width', 2)
              .attr('fill', 'none')
              .on('mouseover', tip.show)
              .on('mouseout', tip.hide)
        
        var totalLength = ballPath.node().getTotalLength() + 200;
              
            ballPath
              .attr("stroke-dasharray", totalLength+" "+ totalLength)
              .attr("stroke-dashoffset", totalLength)
              .transition()
                .duration(4000)
                .delay(function(d, i){ return i*1000; })
                .ease("linear")
                .attr("stroke-dashoffset", 0);


        
        
        console.log('HI')
          


        svg.call(tip);

      }
    };
  }]);
