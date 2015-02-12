'use strict';

/**
 * @ngdoc overview
 * @name agencyApp
 * @description
 * # agencyApp
 *
 * Main module of the application.
 */
angular
  .module('agencyApp', [
    'ui.router',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',

    'btford.socket-io'
  ])
  .run(   ['$rootScope', '$state', '$window', 'Layout',
  function ($rootScope,   $state,   $window,   Layout) {
    //Statechange
    $rootScope.$on('$stateChangeStart', function () {
      $window.scrollTo(0, 0);
    });
    $rootScope.$on('$stateChangeSuccess', function () {
      $window.scrollTo(0, 0);
      $rootScope.state = $state.current.name;
      $rootScope.layout = $state.current.layout;
      Layout.set($state.current.layout);
    });
    $rootScope.$on('$stateChangeError', function () {
      console.log('STATE CHANGE ERROR');
    });

  }])
  .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider',
  function ($locationProvider,   $stateProvider,   $urlRouterProvider,   $httpProvider) {
    // State Configurations //
    $httpProvider.defaults.withCredentials = true;

    $stateProvider

      .state('card', {
        url: '/',
        templateUrl: 'views/card.html',
        controller: 'cardCtrl',
        layout: 'card'
      })
      .state('cv', {
        url: '/cv',
        //templateUrl: 'views/card.html',
        //controller: 'cardCtrl',
        layout: 'card'
      })
      .state('portfolio', {
        url: '/portfolio',
        //templateUrl: 'views/card.html',
        //controller: 'cardCtrl',
        layout: 'card'
      })


      .state('blog', {
        url: '/post',
        templateUrl: 'views/post.html',
        controller: 'postCtrl',
        layout: 'ui'
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
  }]);