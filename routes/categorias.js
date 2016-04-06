var express = require('express');
var mongoose   = require('mongoose');

var Categoria = require('../models/oferta').CategoriaModel;

var router = express.Router();              // get an instance of the express Router


router.route('/categorias')

  .get(function(req,res){
    Categoria.find(function(err, categorias) {
          if (err)
              res.send(err);

          res.json(categorias);
      });
  })

  .post(function(req, res) {

    console.log(req.body);
    var categoria = new Categoria();
    
    categoria.nome = req.body.nome;
    categoria.desconto = req.body.desconto;
    categoria.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Categoria criada!' });
    });
  })

;

router.route('/categorias/:id')

  .get(function(req, res) {
    Categoria.findById(req.params.id, function(err, categoria) {
        if (err)
            res.send(err);
        res.json(categoria);
    });   
  })  

  .put(function(req, res) {
    Categoria.findById(req.params.id, function(err, categoria) {
        if (err)
            res.send(err);
        categoria.nome = req.body.nome;
        categoria.desconto = req.body.desconto;

        categoria.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'categoria updated!' });
        });
    });
  })

  .delete(function(req, res) {
    console.log(req.body);
    Categoria.remove({
        _id: req.params.id
    }, function(err, categoria) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
  })
;

module.exports = router;
