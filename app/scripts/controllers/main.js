'use strict';

/**
 * @ngdoc function
 * @name candyGramApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the candyGramApp
 */
angular.module('candyGramApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
