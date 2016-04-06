var express = require('express');
var rotaUser = require('./usuarios.js');
var rotaOferta = require('./ofertas.js');
var rotaCupom = require('./cupons.js');
var rotaCategoria = require('./categorias.js');
var router = express.Router();              // get an instance of the express Router

router.use('/usuarios', rotaUser);
router.use('/ofertas', rotaOferta);
router.use('/cupons', rotaCupom);
router.use('/categorias', rotaCategoria);

console.log(router);


module.exports = router;
