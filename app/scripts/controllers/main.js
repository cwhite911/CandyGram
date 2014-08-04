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
    		update.geometry = $scope.geo;
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
        setTimeout(function(){$scope.getMapData();}, 2000);
		$scope.status.form = false;
		$scope.status.map = true;
   	};

     $scope.status = {
     	'button': true,
     	'form': false,
     	'map': false
     };
     
     $scope.joinUs = function(){
     	$scope.status.button = false;
     	$scope.status.form = true;
     };
     
     $scope.mapData = {};
     $scope.center = {lat: 35.843768, lng:-78.6450559, zoom: 11};
     var localIcons = {
        defaultIcon: {},
        divIcon: {
            type: 'div',
            html: '',
            popupAnchor:  [0, 0]
        },
        googleFiberRabbit: {
            iconUrl: 'images/googleFiberIconWShadow.png',
            iconSize:     [75, 75],
            shadowSize:   [0, 0]
        }
    };
     $scope.getMapData = function (){
     	 $http.get('http://localhost:3000/raleigh/api/fiber').success(function(res){
     	 	console.log(res);
     	 	for (var each in res){
     	 		if(res[each].geometry !== null){
     	 			$scope.mapData[res[each]._id] = res[each].geometry;
                    $scope.mapData[res[each]._id].icon = localIcons.googleFiberRabbit;
                    if ($scope.user === res[each]._id){
                        $scope.center.lat = res[each].geometry.lat;
                        $scope.center.lng = res[each].geometry.lng;
                    }
                    
     	 		}	
                console.log($scope.center);
     	 	}

    

   
     	 });
     };
      angular.extend($scope, {
        markers: $scope.mapData
    });
     angular.extend($scope, {
        Raleigh: $scope.center//{lat: 35.843768,lng:-78.6450559, zoom: 11}
                    
    });
    angular.extend($scope, {
        icons: localIcons
    });
    	
    

  }
]);