'use strict';

/**
 * @ngdoc service
 * @name agencyApp.layout
 * @description
 * # layout
 * Service in the agencyApp.
 */
angular.module('agencyApp')
  .factory('Layout', function() {
    var layout = 'card';
    return {
      get: function() {
        return layout;
      },
      set: function(val) {
        layout = val;
      }
    };
  });
