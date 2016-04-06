angular.module('starter.filter', [])

.filter('totime', function() {
  return function(input) {
    return input.substring(0, 5);
  };
})

.filter('OfertasFilter', function() {
  return function(input, ofertasDeHoje,categorias) {
    var hoje =  new Date().getDay();
    var filteredList = [];
    var diaAtual = new Date();
    var dataVencimento;
    for(var i = 0; i < input.length; i ++) {        
      dataVencimento = new Date(input[i].validade);        
      if(dataVencimento > diaAtual){
        for(var categoria in categorias) {
          if(categorias[categoria]) {
            if(ofertasDeHoje){//se tiver setado apenas ofertas do dia
              if(input[i].categoria === categoria && input[i].diasValidos[hoje] == true) {
                    filteredList.push(input[i]);
                  break;
              }
            }else{
              if(input[i].categoria === categoria) {
                  filteredList.push(input[i]);
                  break;
              }
            }
          }
        }
      }
    }
    return filteredList;
  };
})

.filter('converteData', function() {
  return function(data) {
    data = data.split("/");
    return data[1]+"/"+data[0]+"/"+data[2];      
  };
})

;