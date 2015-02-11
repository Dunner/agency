'use strict';

/**
 * @ngdoc service
 * @name agencyApp.socket
 * @description
 * # socket
 * Factory in the agencyApp.
 */
angular.module('agencyApp')
  .factory('socket', function (socketFactory) {
    return socketFactory();
  });
