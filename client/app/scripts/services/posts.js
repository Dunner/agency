'use strict';


/**
 * @ngdoc service
 * @name agencyApp.Posts
 * @description
 * # Posts
 * Service in the agencyApp.
 */

angular.module('agencyApp')
   .service('Posts', function ($resource) {
      return $resource('api/posts/:slug', {
         slug: '@slug'
      });
   });