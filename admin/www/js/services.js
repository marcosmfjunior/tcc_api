angular.module('starter.services', [])

.factory('user', ['$http', function($http) {
  
    var urlBase = 'http://localhost/clube/usuario';
    var dados = {};

    dados.getUsers = function () {
        return $http.get(urlBase);
    };

    dados.getUser = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    dados.insertUser = function (cust) {
        return $http.post(urlBase, cust).then(function(result){
          return result;            
        });
    };

    dados.updateUser = function (cust) {
        return $http.put(urlBase + '/' + cust.ID, cust)
    };

    dados.deleteUser = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    dados.getOrders = function (id) {
        return $http.get(urlBase + '/' + id + '/orders');
    };
    console.log(dados);
    return dados;
}])

.factory('oferta', ['$http', function($http) {
  
    //var urlBase = 'http://agenda53.com.br/teste/user.php';
    var urlBase = 'http://localhost/clube/ofertas';    
    var dados = {};

    dados.getOfertas = function () {
        return $http.get(urlBase);
    };

    dados.getOferta = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    dados.insertOferta = function (cust) {
        return $http.post(urlBase, cust).then(function(result){
          return result;            
        });
    };

    dados.updateOferta = function (cust) {
        return $http.put(urlBase + '/' + cust.ID, cust)
    };

    dados.deleteOferta = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    
    console.log(dados);
    return dados;
}])

.factory('cupom', ['$http', function($http) {
  
    var urlBase = 'http://agenda53.com.br/teste/user.php';
    var dados = {};

    dados.getCupoms = function () {
        return $http.get(urlBase);
    };

    dados.getCupom = function (id,idUser) {
        return $http.get(urlBase + '/' + id+ '/' + idUser);//no lado do servidor faz a verficaçao se o usuario ja pegou cupom de tal oferta
    };

    dados.insertCupom = function (cust) {
        return $http.post(urlBase, cust).then(function(result){
          return result;            
        });
    };

    dados.updateCupom = function (cust) {
        return $http.put(urlBase + '/' + cust.ID, cust)
    };

    dados.deleteCupom = function (id) {
        return $http.delete(urlBase + '/' + id);
    };
    
    console.log(dados);
    return dados;
}])



.factory('User2', function($http,$q,$resource) {
  var noticias = $http.get("http://comunica.furg.br/rss.php")
    .then(function(response) {
      console.log(response);
      var data = [];
      for(var i = 0; i<20; i++){
        data.push(response.data.item[i]);
      }
        return data;
    },function(reason) { // quando falha a request
      popUp.show("Comunica FURG","Erro","Não foi possível buscar os dados, verifique a sua conexão");      
    }); 
  return {
    all: function() {
      return noticias.then(function(array){
        return array;
      });
    },
    get: function(noticiaIndex) {
    return noticias.then(function(array) {
        return array[parseInt(noticiaIndex)];        
    });
  }
  };
})




.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.factory('Toast', function($rootScope, $timeout, $ionicPopup, $cordovaToast) {
      return {
          show: function (message, duration, position) {
            message = message || "";
            duration = duration || 'short';
            position = position || 'bottom';

            if (!!window.cordova) {
              // Use the Cordova Toast plugin
          $cordovaToast.show(message, duration, position);              
            }
            else {
                    if (duration == 'short') {
                        duration = 2000;
                    }
                    else {
                        duration = 5000;
                    }
            }
      }
    };
  })


;
