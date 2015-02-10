'use strict';

/**
 * @ngdoc function
 * @name postAppApp.controller:postCtrl
 * @description
 * # postCtrl
 * Controller of the postApp
 */
angular.module('postApp')
  .controller('postCtrl', function ($scope, Posts, $filter ) {
    
    $scope.addPost = function() {
      if ($scope.form.name.length > 2) {

        //Create sound in db
        var newPost = new Posts({
          name: $scope.form.name,
          slug: $filter('slug')($scope.form.name),
          completed: false
        });
        newPost.$save(function(){
          $scope.form = {name: ''};
        });

      } else {
        $scope.error = 'Too short';
      }
    };

    
    
  });
