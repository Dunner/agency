'use strict';

/**
 * @ngdoc service
 * @name postApp.socket
 * @description
 * # socket
 * Factory in the postApp.
 */
angular.module('postApp')
  .factory('socket', function (socketFactory) {
    return socketFactory();
  });
