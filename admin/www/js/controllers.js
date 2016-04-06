angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $timeout,$state) {

  $scope.fbLogin = function () {

      ngFB.login({scope: 'email,public_profile,user_birthday,user_location'}).then(
          function (response) {
              if (response.status === 'connected') {
                  console.log('Facebook login succeeded');
                  $scope.closeLogin();

              } else {
                  alert('Facebook login failed');
              }
          });
  };

  $scope.fbLogout = function (){
    ngFB.logout().then(
      function (response) {
        console.log(response);
    });   
  };

  $scope.loginData = {};

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})



.controller('ProfileCtrl', function ($scope, ngFB,user, $state) {
    ngFB.api({
        path: '/me',
        params: {fields: 'id,email,birthday,name,gender,location'}
    }).then(
        function (user) {
            $scope.user = user;
            $scope.user.birthday = new Date($scope.user.birthday);
            console.log(user);
        },
        function (error) {
          alert("nao foi   "+error);
            alert('Facebook error: ' + error.error_description);
        });


  $scope.insertUser = function () {
    var dados = {
        nome: $scope.user.name,
        email: $scope.user.email,
        senha: $scope.user.senha,
        cidade: $scope.user.location.name,
        cpf: $scope.user.cpf,
        telefone: $scope.user.telefone,
        aniversario: $scope.user.birthday
    };
    user.insertUser(dados).then(function(res){
      if(res.data == 1) //verifica se info retornada do server é verdadeira(incluiu os dados)
          $state.go('app.ofertas');
        else 
          console.log('false');
    });                        
  };   
})

.controller('OfertasCtrl', function ($scope, oferta, ngFB, $state) {
  // $scope.categorias=[
  // {"tipo":1,"nome":"alimentacao","exibe":true},
  // {"tipo":2,"nome":"lazer","exibe":true},
  // {"tipo":3,"nome":"hospedagem","exibe":true}
  // ];

  // inputs do modal
  $scope.categorias = {
        alimentacao: true,
        lazer: true,
        hospedagem: true
    };

  $scope.ofertasDeHoje = true;

  $scope.toggleAltera = function(){
     if($scope.ofertasDeHoje == false) {
     $scope.ofertasDeHoje = true;  
     }
     else
       $scope.ofertasDeHoje = false;
   };
  // fim inputs do modal

  oferta.getOfertas().then(function(res){

    console.log(res.data);
    if(res)
      $scope.ofertas = res.data;
    else
      console.log("nao");
  });

  // $scope.ofertas = [
  // {'id':'1','nome':'Hamburguer grande + Coca-Cola Média + Batata frita Grande','validade': '12/15/2016','categoria':'alimentacao','desconto':'1','diasValidos':{'1':true,'2':false,'3':false,'4':false,'5':false,'6':false,'7':false,},'imagem':'https://img.peixeurbano.com.br/?img=https://s3.amazonaws.com/pu-mgr/default/a0RG000000eftxbMAA/553fbe53e4b0392bfc8ab196.jpg&w=620&h=400','logo':'http://alscib.com.br/wp-content/uploads/2015/08/Burger-KIng.jpg','empresa':'EmPrEsa'},
  // {'id':'2','nome':'Pizza grande + Guaraná Antártica','validade': '12/15/2016','categoria':'alimentacao','desconto':'2','diasValidos':{'1':true,'2':true,'3':true,'4':true,'5':false,'6':false,'7':false,},'imagem':'https://img.peixeurbano.com.br/?img=https://s3.amazonaws.com/pu-mgr/default/a0RG000000eftxbMAA/553fbe53e4b0392bfc8ab196.jpg&w=620&h=400','logo':'http://alscib.com.br/wp-content/uploads/2015/08/Burger-KIng.jpg','empresa':'EmPrEsa'},
  // {'id':'3','nome':'Croquete com maionese - O retorno da larica dos muleque','validade': '12/10/2016','categoria':'alimentacao','desconto':'2','diasValidos':{'1':true,'2':true,'3':true,'4':true,'5':false,'6':false,'7':false,},'imagem':'https://img.peixeurbano.com.br/?img=https://s3.amazonaws.com/pu-mgr/default/a0RG000000eftxbMAA/553fbe53e4b0392bfc8ab196.jpg&w=620&h=400','logo':'http://alscib.com.br/wp-content/uploads/2015/08/Burger-KIng.jpg','empresa':'EmPrEsa'},
  // {'id':'4','nome':'1 hora no boliche','validade': '12/10/2016','categoria':'lazer','desconto':'1','diasValidos':{'1':true,'2':true,'3':true,'4':true,'5':false,'6':false,'7':false,},'imagem':'https://img.peixeurbano.com.br/?img=https://s3.amazonaws.com/pu-mgr/default/a0RG000000eftxbMAA/553fbe53e4b0392bfc8ab196.jpg&w=620&h=400','logo':'http://alscib.com.br/wp-content/uploads/2015/08/Burger-KIng.jpg','empresa':'EmPrEsa'},
  // {'id':'5','nome':'2 diárias pousada KKK','validade': '12/15/2016','categoria':'hospedagem','desconto':'1','diasValidos':{'1':false,'2':false,'3':false,'4':false,'5':false,'6':true,'7':false,},'imagem':'https://img.peixeurbano.com.br/?img=https://s3.amazonaws.com/pu-mgr/default/a0RG000000eftxbMAA/553fbe53e4b0392bfc8ab196.jpg&w=620&h=400','logo':'http://alscib.com.br/wp-content/uploads/2015/08/Burger-KIng.jpg','empresa':'EmPrEsa'}
  // ];  

  $scope.verOferta = function(idOferta){
    $state.go('app.ofertas-detail',{id:idOferta});
  }  

  
})

.controller('OfertaCtrl', function ($scope, oferta, cupom, $state, $stateParams){
  
  $scope.onUserDetailContentScroll = onUserDetailContentScroll

  oferta.getOferta($stateParams.id).then(function(res){
    if(res)
      $scope.oferta = res.data[0];
    else
      console.log("nao");
  });

  // $scope.oferta = 
  // {'id':'1','nome':'Hamburguer grande + Coca-Cola Média + Batata frita Grande','estabelecimento':'Burger-King','validade': '15/12','categoria':'alimentacao','desconto':'1','diasValidos':{'1':true,'2':false,'3':true,'4':false,'5':true,'6':true,'7':true,},'imagem':'https://img.peixeurbano.com.br/?img=https://s3.amazonaws.com/pu-mgr/default/a0RG000000eftxbMAA/553fbe53e4b0392bfc8ab196.jpg&w=620&h=400','logo':'http://alscib.com.br/wp-content/uploads/2015/08/Burger-KIng.jpg','empresa':'EmPrEsa','descricao':'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'};
  
  // var idOferta = $scope.oferta.id;
  // var idUser = "teste";
  $scope.diaValido= function(dia){
    if($scope.oferta.diasValidos[dia] == true)
      return "valido";
    else
      return "";
    //if($scope.oferta.diasValidos)
  }
  console.log($scope.oferta);

  $scope.getCupom = function () {
    
     cupom.getCupom(idOferta,idUser).then(function(res){
      if(res.data == 1){ 
        //verifica se info retornada do server é verdadeira(incluiu os dados)
        $state.go('app.cupons');        
      }   
      else{ 
         
         $state.go('app.cupons');//deixar apenas para testes
      }
    });                        
  };   

  f
})

.controller('CuponsCtrl', function ($scope, cupom, $state){
  console.log("foi");
  $scope.cupons =[
  {'id':'1','numero':'ABC1234','estabelecimento':'Burger-King','utilizado':true,'nome':'Hamburguer grande + Coca-Cola Média + Batata frita Grande','validade': '15/03','categoria':'alimentacao','desconto':'1','diasValidos':{'1':true,'2':false,'3':true,'4':false,'5':true,'6':true,'7':true,},'imagem':'https://img.peixeurbano.com.br/?img=https://s3.amazonaws.com/pu-mgr/default/a0RG000000eftxbMAA/553fbe53e4b0392bfc8ab196.jpg&w=620&h=400','logo':'http://alscib.com.br/wp-content/uploads/2015/08/Burger-KIng.jpg','empresa':'EmPrEsa','descricao':'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
  {'id':'1','numero':'ABC1234','estabelecimento':'Burger-King 2','utilizado':false,'nome':'Pizza grande','validade': '15/03','categoria':'alimentacao','desconto':'1','diasValidos':{'1':true,'2':false,'3':true,'4':false,'5':true,'6':true,'7':true,},'imagem':'https://img.peixeurbano.com.br/?img=https://s3.amazonaws.com/pu-mgr/default/a0RG000000eftxbMAA/553fbe53e4b0392bfc8ab196.jpg&w=620&h=400','logo':'http://alscib.com.br/wp-content/uploads/2015/08/Burger-KIng.jpg','empresa':'EmPrEsa','descricao':'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
  ];
  
})

.controller('TesteCtrl', function ($scope){
  console.log("foi");
})

;