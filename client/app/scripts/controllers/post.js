'use strict';

/**
 * @ngdoc function
 * @name agencyApp.controller:postCtrl
 * @description
 * # postCtrl
 * Controller of the agencyApp
 */
angular.module('agencyApp')
  .controller('postCtrl', function ($scope, Posts, $filter ) {

    Posts.query(function(response) {
      $scope.posts = response;
    });

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
