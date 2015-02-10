'use strict';


/**
 * @ngdoc service
 * @name postApp.Posts
 * @description
 * # Posts
 * Service in the postApp.
 */

angular.module('postApp')
   .service('Posts', function ($resource) {
      return $resource('api/posts/:slug', {
         slug: '@slug'
      });
   });