var express = require('express');
var mongoose   = require('mongoose');

var Usuario = require('../models/oferta').UsuarioModel;

var router = express.Router();              // get an instance of the express Router

router.route('/')

  .post(function(req, res) {
    console.log('en');
    Usuario.findOne({email: req.body.email}, function(err, usuario) {
        //console.log(req.params.oferta_id);
        if (err){
            res.send(err);
        }
        if(usuario === null){
          var usuario = new Usuario();
          usuario.nome = req.body.nome;
          usuario.email = req.body.email;
          usuario.senha = req.body.senha; 

          usuario.save(function(err){
            if(err)
              res.send(err);
            res.json({op:true, message : 'user criado', user: usuario._id});
          })     
        }else{
          res.json({op: false ,message : 'user ja registrado'});     
        }
    })
  });

module.exports = router;