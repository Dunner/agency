'use strict';

/**
 * @ngdoc filter
 * @name postApp.filter:slug
 * @function
 * @description
 * # slug
 * Filter in the postApp.
 */
angular.module('postApp')
  .filter('slug', function () {
    return function (text) {
      return text.replace(/[^a-z0-9_ -]/gi, '').replace(/\s+/g, '-').toLowerCase();
    };
  });
