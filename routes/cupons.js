var express = require('express');
var mongoose   = require('mongoose');

var Cupom = require('../models/oferta').CupomModel;

var router = express.Router();              // get an instance of the express Router


router.route('/cupons')
  .post(function(req, res) {

    var cupom = new Cupom();
    cupom.codigo = req.body.codigo;
    cupom.usuario = req.body.usuario;
    cupom.oferta = req.body.oferta_id;

    cupom.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Cupom criada!' });
    });
  })

  .get(function(req, res) {
    Cupom.find(function(err, cupons) {
        if (err)
            res.send(err);

        res.json(cupons);
    });
  })  
;


router.route('/cupons/:oferta_id/:user_id')
  
  .get(function(req, res) {
    //console.log(req.query);
    Cupom.findOne({oferta:{_id:req.params.oferta_id}, usuario: req.params.user_id}, function(err, cupom) {
        //console.log(req.params.oferta_id);
        if (err){
            res.send(err);
        }
        if(cupom === null){
          var cupom = new Cupom();
          var oferta = JSON.parse(req.query.dado);
          console.log(oferta);
          cupom.oferta = oferta;
          console.log(cupom.oferta);
          cupom.codigo = geraCodigo(oferta,req.params.user_id);
          cupom.usuario = req.params.user_id;   
          cupom.usado = false;       

          Cupom.findOne({codigo: cupom.codigo}, function(err, checaCupom){
            if(err)
              res.send(err);
            if(checaCupom === null){ //checa se ja nao foi gerado o cupom
              cupom.save(function(err) {
                if (err)
                  res.send(err);      
                  console.log(cupom);
                  res.json({ codigo: cupom });
              });
            }          
            else{
              cupom.codigo = geraCodigo(oferta,req.params.user_id);
              cupom.save(function(err) {
                if (err)
                  res.send(err);      
                  console.log(cupom);
                  res.json({ codigo: cupom });
              });
            }
          })          
        }else{
          res.json({ message: 'ja pegou' });
        }
    });  

    function geraCodigo(oferta,user){
      var categoria = oferta.categoria.substring(0,1);
      
      var d = new Date();
      var horaResgate = d.getHours();
      horaResgate = String.fromCharCode(65 + horaResgate);
      
      var rand = Math.floor((Math.random()*(999-100))+100);
      rand= rand.toString();
      var numero1=rand[0];
      var numero2=rand[1];
      var numero3=rand[2];
      rand = Math.floor((Math.random()*(0-26))+26);
      var letraRand = String.fromCharCode(65 + rand);

      var codigo = categoria+numero1+numero3+horaResgate+numero2+letraRand;
      return codigo;
    } 
  }) 

  .post(function(req, res) {

    var cupom = new Cupom();
    cupom.codigo = req.body.codigo;
    cupom.usuario = req.body.usuario;
    cupom.oferta = req.body.oferta;

    cupom.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Cupom criada!' });
    });
  })
;

router.route('/cupons/:user_id')
  .get(function(req, res) {
    Cupom.find({usuario: req.params.id}, function(err, cupom) {
        if (err)
            res.send(err);
        res.json(cupom);
    });   
  })  
;

module.exports = router;
