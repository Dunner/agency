'use strict';

/**
 * @ngdoc function
 * @name agencyApp.controller:layoutCtrl
 * @description
 * # layoutCtrl
 * Controller of the agencyApp
 */
angular.module('agencyApp')
  .controller('layoutCtrl', function ($scope, Layout) {

    $scope.layout = Layout.get;

  });
