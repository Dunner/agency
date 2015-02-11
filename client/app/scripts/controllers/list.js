'use strict';

/**
 * @ngdoc function
 * @name agencyApp.controller:listCtrl
 * @description
 * # listCtrl
 * Controller of the agencyApp
 */
angular.module('agencyApp')
  .controller('listCtrl', function ($scope, $filter, Posts) {
    
    Posts.query(function(response) {
      $scope.posts = response;
    });
    
  });
