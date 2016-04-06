var express = require('express');
var mongoose   = require('mongoose');

var Oferta = require('../models/oferta').OfertaModel;

var router = express.Router();              // get an instance of the express Router

router.route('/ofertas')

  .get(function(req, res) {
    Oferta.find(function(err, ofertas) {
        if (err)
            res.send(err);

        res.json(ofertas);
    });
  })  

  .post(function(req, res) {

    var oferta = new Oferta();
    oferta.nome = req.body.nome;
    oferta.empresa = req.body.empresa;
    oferta.imagem = req.body.imagem;
    oferta.logo = req.body.logo;
    oferta.validade = req.body.validade;
    oferta.desconto = req.body.desconto;
    oferta.categoria = req.body.categoria;
    oferta.diasValidos = req.body.diasValidos;
    oferta.cupons = req.body.cupons;
    oferta.descricao = req.body.descricao;


    oferta.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Oferta criada!' });
    });
  })
;

router.route('/ofertas/:oferta_id')

  .get(function(req, res) {
    Oferta.findById(req.params.oferta_id, function(err, oferta) {
        if (err)
            res.send(err);
        res.json(oferta);
    });   
  })  

  .put(function(req, res) {
    Oferta.findById(req.params.oferta_id, function(err, oferta) {
        if (err)
            res.send(err);

        oferta.nome = req.body.nome;
        oferta.empresa = req.body.empresa;
        oferta.imagem = req.body.imagem;
        oferta.logo = req.body.logo;
        oferta.validade = req.body.validade;
        oferta.desconto = req.body.desconto;
        oferta.categoria = req.body.categoria;
        oferta.diasValidos = req.body.diasValidos;
        oferta.cupons = req.body.cupons;
        oferta.descricao = req.body.descricao;

        oferta.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'oferta updated!' });
        });
    });
  })

  .delete(function(req, res) {
    Oferta.remove({
        _id: req.params.oferta_id
    }, function(err, oferta) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
  });
;


module.exports = router;
