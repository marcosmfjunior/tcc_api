'use strict';

angular.module('myApp.controllers', ['ngStorage'])
  
  .controller('PerfilCtrl', function($scope,$routeParams,Dados,$location) {
    $scope.busca = $routeParams.nick;
    $scope.nick = $routeParams.nick;

     Dados.all()
      .then(function(data) {
        console.log(data);
        $scope.list = data;
      }, function(error) {
        console.log(error);
      });

    $scope.mudaPagina = function(pag){
       $location.path(pag);
    }
    
  })

  .controller('HomeCtrl', function($scope, Dados, $localStorage,$sessionStorage,$http, $templateCache) {
    //funçao que usa o service Dados para pegar os dados
    Dados.all()
      .then(function(data) {
        $scope.list = data;
      }, function(error) {
        console.log(error);
      });

    $scope.editando = false;

    if($localStorage.nick != null)
      $scope.novoNick = $localStorage.nick;
    
    $scope.add = function(){
      $scope.list.push(
      {
        tweet: $scope.novoTweet,
        nick: $scope.novoNick,
        data:  new Date()
      });    

      $localStorage.nick = $scope.novoNick;
      $scope.novoTweet = "";
      $scope.novoPreco = ""; 
      //atualizaJson(); 
    };
    
    function atualizaJson() {
      
      //pega o ultimo tweet e passa para o formato JSON e faz a requisição via post
      var dados = angular.toJson($scope.list[0]);

      var method = 'POST';
      var url = 'salvar.php';
      $http({
        method: method,
        url: url,
        data: $.param({'data' : dados}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }).
      success(function(response) {
        console.log(response.data);
      }).
      error(function(response) {
          $scope.codeStatus = response || "Request failed";        
      });
      return false;
      
    }
  })

  