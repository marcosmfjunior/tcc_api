'use strict';

angular.module('myApp.services', [])
  .factory('Dados', function($http, $q) {
    return {
      all: function() {
        return $http.post('request.json')
          .then(function(response) {
              return response.data;
            }, function(response) {
            // something went wrong
            return $q.reject(response.data);
          });
      },
      get: function(index) {
        return programacoes.then(function(array) {
            return array[parseInt(index)];        
        });
      }
    };
  });
