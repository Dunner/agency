'use strict';

/**
 * @ngdoc directive
 * @name agencyApp.ngNavigation
 * @description
 * # ngNavigation
 * Service in the agencyApp.
 */

angular.module('agencyApp')
  .directive('ngNavigation', function() {
    return {
      restrict: 'EA',
      scope: true,
      controller: function($scope, $element) {
        $scope.audioElement = $element[0].children[1];
        
      },
      templateUrl: './views/navigation.html'
    };
  });