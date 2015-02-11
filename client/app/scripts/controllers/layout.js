'use strict';

/**
 * @ngdoc function
 * @name agencyApp.controller:layoutCtrl
 * @description
 * # layoutCtrl
 * Controller of the agencyApp
 */
angular.module('agencyApp')
  .controller('layoutCtrl', function ($scope) {

    $scope.card = true;
    $scope.changeLayout = function() {
      $scope.card = !$scope.card;
    };
    
    
  });
