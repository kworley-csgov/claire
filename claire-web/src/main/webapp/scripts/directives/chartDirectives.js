'use strict';

angular.module('claire.directives').
directive('pieChart', ["$window", function($window) {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            scope.$watch("twitterStats", function(newValue, oldValue) {
                if (newValue && newValue !== oldValue) {
                    radialProgress(element[0])
                        .id('cumulativeBlue')
                        .diameter('200')
                        .margin({top:0, right:0, bottom:0, left:0})
                        .showLegend(false)
                        
                        .value(newValue.percentNegative, 0)
                        .arcDesc('Negative', 0)

                        .value(newValue.percentUnknown, 1)
                        .arcDesc('Neutral', 1)

                        .value(newValue.percentPositive, 2)
                        .arcDesc('Positive', 2)

                        .theme('blue')
                        .style('cumulative')
                        .render();
                }
            });
        }
    };
}]).
directive('pieChartSml', ["$window", function($window) {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            scope.$watch("twitterStats", function(newValue, oldValue) {
                if (newValue && newValue !== oldValue) {
                  
                  var tweets = newValue.percentNegative * 100;
                  console.log(tweets);
                  
                    radialProgress(element[0])
                        .id('negativeTweets')
                        .diameter('60')
                        .margin({top:0, right:0, bottom:0, left:0})
                        .showLegend(false)
                        
                        .value(newValue.tweets, 0)

                        .theme('blue')
                        .style('cumulative')
                        .render();
                }
            });
        }
    };
}]).
directive('rankingsChart', [function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            var options = {
                yaxis: {
                    min: 0,
                    max: 100
                }
            };
            scope.$watch("rankings", function(newValue, oldValue) {
                if (newValue && newValue !== oldValue) {
                    $.plot(element[0], newValue, options);
                }
            });
        }
    };
}]).
directive('lineChart', [function() {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            var options = {
                series: {
                    lines: { 
                      show: true,
                      lineWidth: 2,
                      steps: false,
                    },
                    points: { 
                      show: true,
                      radius: 2,
                      symbol: "circle",
                      lineWidth: 2,
                      fill: true,
                      fillColor: null
                    },
                    clickable: true,
                    hoverable: true,
                    shadowSize: 0,
                },
                grid: {
                    show: true,
                    color: "#CCC",
                    borderWidth: { top: 0, right: 0, bottom: 0, left: 0 },
                    clickable: true,
                    hoverable: true,
                    autoHighlight: true
                },
                tooltip: {
                    show: true,
                    content: "<span>%y%</span>",
                    defaultTheme: false,
                    shifts: {
                        x: -30,
                        y: -38
                    },
                },
                colors: [ 
                    "#e79090",
                    "#bee76f",
                    "#e0e0e0",
                    "rgba(0,0,0,0.2)",
                    "rgba(255,0,205,0.3)",
                ],
                xaxis: {
                    font: { 
                      size: 11,
                      lineHeight: 16,
                      weight: "300",
                      family: "Raleway",
                      color: "#444"
                    },
                    mode: "time",
                    tickLength: 10,
                    reserveSpace: true
                },
                yaxis: {
                    font: { 
                      size: 11,
                      lineHeight: 16,
                      weight: "300",
                      family: "Raleway",
                      color: "#444"
                    },
                    min: 0,
                    max: 100
                }
            };

            scope.$watch('mainChartData', function(newValue, oldValue) {
                if (newValue && newValue !== oldValue) {
                    $.plot(element[0], newValue, options);                    
                }
            });
        }
    };
}]);
