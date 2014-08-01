'use strict';

/**
 * @ngdoc function
 * @name candyGramApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the candyGramApp
 */


angular.module('candyGramApp').controller('MainCtrl', ['$scope', '$http',
    function($scope, $http) {
    	$scope.geo = null;
    	$scope.user = null;
    	$scope.create = function() {
            var address_string = angular.element(address).val() + " " + angular.element(city).val() +", "+ angular.element(state).val() + " " + angular.element(zip).val();
            var data = {address: address_string};
            var getCoords = function(){   
                $http.get('https://maps.googleapis.com/maps/api/geocode/json?', {params: data}).success(function(res){
                    console.log(res.status);
                    var coords = res.results[0].geometry.location;
                    console.log(coords);
                  	$scope.geo = coords;
                  	return true;
                });
            };
            getCoords(angular.element(address).val(), angular.element(city).val(), angular.element(zip).val());

        };

     $scope.send = function (data){
        var update = data;
    	$scope.create();
    	setTimeout(function(){
    		update.geometry = $scope.geo
        	var info = angular.toJson(update);
        	console.log(info);
       		$http.post('http://localhost:3000/raleigh/api/fiber', info)
        		.success(function(res){
          			console.log(res);
          			$scope.user = res._id;
          			
        	})
        	.error(function(err){
          		if(err){
            		console.log(err);
          		}
        	});
      	}, 1000);  
		$scope.status.form = false;
		$scope.status.map = true;
   	}

     $scope.status = {
     	'button': true,
     	'form': false,
     	'map': false
     }
     
     $scope.joinUs = function(){
     	$scope.status.button = false;
     	$scope.status.form = true;
     }
     
     $scope.mapData = {};
     $scope.getMapData = function (){
     	 $http.get('http://localhost:3000/raleigh/api/fiber').success(function(res){
     	 	console.log(res);
     	 	for (var each in res){
     	 		console.log(res[each]);
     	 		if(res[each].geometry !== null){
     	 			$scope.mapData[res[each]._id] = res[each].geometry
     	 		}	
     	 		console.log($scope.mapData);
     	 	}
     	 });
     }
     $scope.getMapData();
    	var localIcons = {
        defaultIcon: {},
        leafIcon: {
            iconUrl: 'examples/img/leaf-green.png',
            shadowUrl: 'examples/img/leaf-shadow.png',
             iconSize:     [38, 95], // size of the icon
            shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        },
        divIcon: {
            type: 'div',
            html: '',
            popupAnchor:  [0, 0]
        },
        orangeLeafIcon: {
            iconUrl: 'examples/img/leaf-orange.png',
            shadowUrl: 'examples/img/leaf-shadow.png',
            iconSize:     [38, 95],
            shadowSize:   [50, 64],
            iconAnchor:   [22, 94],
            shadowAnchor: [4, 62]
        }
    };
    angular.extend($scope, {
        icons: localIcons
    });
    angular.extend($scope, {
    	markers: $scope.mapData
    });
         angular.extend($scope, {
                Raleigh: {
                    lat: 35.843768,
            		lng:-78.6450559,
            		zoom: 11
                },
           //       markers: {
           //  m1: {
           //      lat: 35.843768,
           //    	lng:-78.6450559,
           //      // icon: localIcons.divIcon,
           //  },
           // }
            });

  }
]);