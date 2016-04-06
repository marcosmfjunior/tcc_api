'use strict';

angular.module('myApp', ['ngRoute', 'myApp.controllers', 'myApp.services'])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })

      .when('/perfil/:nick', {
        templateUrl: 'views/perfil.html',
        controller: 'PerfilCtrl'
      })
      ;
  });
