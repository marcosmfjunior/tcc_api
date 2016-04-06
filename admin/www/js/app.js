
angular.module('starter', ['starter.controllers','starter.services','starter.filter','ui.router'])


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.ofertas', {
    url: '/ofertas',
    views: {
      'menuContent': {
        templateUrl: 'templates/ofertas.html',
        controller: 'OfertasCtrl'
      }
    }
  })

  .state('app.ofertas-detail', {
    url: '/ofertas/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/oferta.html',
        controller: 'OfertaCtrl'
      }
    }
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html'
      }
    }
  })

  .state('app.profile', {
      url: "/profile",
      views: {
          'menuContent': {
              templateUrl: "templates/profile.html",
              controller: "ProfileCtrl"
          }
      }
  })

  .state('app.cupons', {
      url: "/cupons",
      views: {
          'menuContent': {
              templateUrl: "templates/cupons.html",
              controller: "CuponsCtrl"
          }
      }
  })
   .state('app.teste', {
      url: "/",
      views: {
          'menuContent': {
              templateUrl: "templates/teste.html",
              controller: "TesteCtrl"
          }
      }
  })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/teste');
});
