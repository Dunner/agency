'use strict';

/**
 * @ngdoc filter
 * @name agencyApp.filter:slug
 * @function
 * @description
 * # slug
 * Filter in the agencyApp.
 */
angular.module('agencyApp')
  .filter('slug', function () {
    return function (text) {
      return text.replace(/[^a-z0-9_ -]/gi, '').replace(/\s+/g, '-').toLowerCase();
    };
  });
