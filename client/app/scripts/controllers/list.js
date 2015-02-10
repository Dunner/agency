'use strict';

/**
 * @ngdoc function
 * @name postApp.controller:listCtrl
 * @description
 * # listCtrl
 * Controller of the postApp
 */
angular.module('postApp')
  .controller('listCtrl', function ($scope, $filter, Posts) {
    
    Posts.query(function(response) {
      $scope.posts = response;
    });
    
  });
