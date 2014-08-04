'use strict';

angular.module('candyGramApp').controller('MapCtrl', ['$scope', '$http',
    function($scope, $http) {
     $scope.mapData = {};
     $scope.heatmapData = [];
     $scope.getMapData = function (){
     	 $http.get('http://localhost:3000/raleigh/api/fiber').success(function(res){
     	 	console.log(res);
     	 	for (var each in res){
     	 		console.log(res[each]);
     	 		if(res[each].geometry !== null){
     	 			$scope.mapData[res[each]._id] = res[each].geometry;
                    $scope.mapData[res[each]._id].icon = localIcons.googleFiberRabbit;
                    $scope.mapData[res[each]._id].message = res[each].name;
                    $scope.heatmapData.push([res[each].geometry.lat, res[each].geometry.lng, .12]);
     	 		}	
     	 		console.log($scope.mapData);
     	 	}
     	 });
         //Adds Icons to map
    angular.extend($scope, {
        icons: localIcons
    });
//Addes Markers to map
    angular.extend($scope, {
        markers: $scope.mapData
    });

    angular.extend($scope, {
        layers: {
                    baselayers: {
                        osm: {
                            name: 'OpenStreetMap',
                            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            type: 'xyz'
                        }
                    },
                    overlays: {
                        heatmap: {
                            name: 'Heat Map',
                            type: 'heatmap',
                            data: $scope.heatmapData,
                            visible: false
                        }
                    }
                }
    });
     };
     $scope.getMapData();
    	var localIcons = {
        defaultIcon: {},
        googleFiberRabbit: {
            iconUrl: 'images/googleFiberIcon.png',
            iconSize:     [75, 75],
            shadowSize:   [0, 0]
        }
    };


         angular.extend($scope, {
                Raleigh: {
                    lat: 35.843768,
            		lng:-78.6450559,
            		zoom: 11
                },
                legend: {
                position: 'bottomleft',
                colors: [ '#ff0000'],
                labels: [ 'Citizen For Google Fiber' ]
            }
                
          
            });

  }
]);