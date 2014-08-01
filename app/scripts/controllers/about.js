'use strict';

/**
 * @ngdoc function
 * @name candyGramApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the candyGramApp
 */
angular.module('candyGramApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
