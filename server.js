var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    assert = require('assert');

var express = require('express');
var request = require('request').defaults({encoding: null});
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var morgan      = require('morgan');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/clube');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(morgan('dev'));


var Oferta = require('./models/oferta').OfertaModel;
var Categoria = require('./models/oferta').CategoriaModel;
var Cupom = require('./models/oferta').CupomModel;
var Usuario = require('./models/oferta').UsuarioModel;

//var url = 'mongodb://localhost:27017/clube';
app.set('superSecret', config.secret);
// ROUTES FOR OUR API
// =============================================================================
var rota = require('./routes/api.js');

var router = express.Router();              // get an instance of the express Router

app.post('/authenticate', function(req, res) {
  // find the user
  Usuario.findOne({
    nome: req.body.nome
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.senha != req.body.senha) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 64000 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});


// 'middleware' todas as rotas passam por aqui antes
// router.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, x-access-token');
    

//   res.header('Access-Control-Allow-Headers', 'x-access-token');
//    console.log(req.headers);
//    console.log('-------------------------------------------');
//   console.log(res);
//      var token = req.body.token || req.query.token || req.headers['x-access-token'] ;
//     // decode token
//     if (token) {

//       // verifies secret and checks exp
//       jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
//         if (err) {
//           return res.json({ success: false, message: 'Failed to authenticate token.' });    
//         } else {
//           // if everything is good, save to request for use in other routes
//           req.decoded = decoded;    
//           next();
//         }
//       });

//     } else {

//       // if there is no token
//       // return an error
//       return res.status(403).send({ 
//           success: false, 
//           message: 'No token provided.' 
//       });
      
//     }
//     // do logging
//     console.log('Something is happening.');
//     next(); // make sure we go to the next routes and don't stop here
// });

router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET http://localhost:8080/api/users)
router.get('/users', function(req, res) {
  Usuario.find({}, function(err, users) {
    res.json(users);
  });
});  

// router.route('/usuarios')

//   .post(function(req, res) {
//     Usuario.findOne({email: req.body.email}, function(err, usuario) {
//         //console.log(req.params.oferta_id);
//         if (err){
//             res.send(err);
//         }
//         if(usuario === null){
//           var usuario = new Usuario();
//           usuario.nome = req.body.nome;
//           usuario.email = req.body.email;
//           usuario.senha = req.body.senha; 

//           usuario.save(function(err){
//             if(err)
//               res.send(err);
//             res.json({op:true, message : 'user criado', user: usuario._id});
//           })     
//         }else{
//           res.json({op: false ,message : 'user ja registrado'});     
//         }
//     })
//   })

// ;


// router.route('/ofertas')

//   .get(function(req, res) {
//     Oferta.find(function(err, ofertas) {
//         if (err)
//             res.send(err);

//         res.json(ofertas);
//     });
//   })  

//   .post(function(req, res) {

//     var oferta = new Oferta();
//     oferta.nome = req.body.nome;
//     oferta.empresa = req.body.empresa;
//     oferta.imagem = req.body.imagem;
//     oferta.logo = req.body.logo;
//     oferta.validade = req.body.validade;
//     oferta.desconto = req.body.desconto;
//     oferta.categoria = req.body.categoria;
//     oferta.diasValidos = req.body.diasValidos;
//     oferta.cupons = req.body.cupons;
//     oferta.descricao = req.body.descricao;


//     oferta.save(function(err) {
//       if (err)
//         res.send(err);

//       res.json({ message: 'Oferta criada!' });
//     });
//   })
// ;

// router.route('/ofertas/:oferta_id')

//   .get(function(req, res) {
//     Oferta.findById(req.params.oferta_id, function(err, oferta) {
//         if (err)
//             res.send(err);
//         res.json(oferta);
//     });   
//   })  

//   .put(function(req, res) {
//     Oferta.findById(req.params.oferta_id, function(err, oferta) {
//         if (err)
//             res.send(err);

//         oferta.nome = req.body.nome;
//         oferta.empresa = req.body.empresa;
//         oferta.imagem = req.body.imagem;
//         oferta.logo = req.body.logo;
//         oferta.validade = req.body.validade;
//         oferta.desconto = req.body.desconto;
//         oferta.categoria = req.body.categoria;
//         oferta.diasValidos = req.body.diasValidos;
//         oferta.cupons = req.body.cupons;
//         oferta.descricao = req.body.descricao;

//         oferta.save(function(err) {
//             if (err)
//                 res.send(err);

//             res.json({ message: 'oferta updated!' });
//         });
//     });
//   })

//   .delete(function(req, res) {
//     Oferta.remove({
//         _id: req.params.oferta_id
//     }, function(err, oferta) {
//         if (err)
//             res.send(err);

//         res.json({ message: 'Successfully deleted' });
//     });
//   });
// ;

// router.route('/cupons')
//   .post(function(req, res) {

//     var cupom = new Cupom();
//     cupom.codigo = req.body.codigo;
//     cupom.usuario = req.body.usuario;
//     cupom.oferta = req.body.oferta_id;

//     cupom.save(function(err) {
//       if (err)
//         res.send(err);

//       res.json({ message: 'Cupom criada!' });
//     });
//   })

//   .get(function(req, res) {
//     Cupom.find(function(err, cupons) {
//         if (err)
//             res.send(err);

//         res.json(cupons);
//     });
//   })  
// ;


// router.route('/cupons/:oferta_id/:user_id')
  
//   .get(function(req, res) {
//     //console.log(req.query);
//     Cupom.findOne({oferta:{_id:req.params.oferta_id}, usuario: req.params.user_id}, function(err, cupom) {
//         //console.log(req.params.oferta_id);
//         if (err){
//             res.send(err);
//         }
//         if(cupom === null){
//           var cupom = new Cupom();
//           var oferta = JSON.parse(req.query.dado);
//           console.log(oferta);
//           cupom.oferta = oferta;
//           console.log(cupom.oferta);
//           cupom.codigo = geraCodigo(oferta,req.params.user_id);
//           cupom.usuario = req.params.user_id;   
//           cupom.usado = false;       

//           Cupom.findOne({codigo: cupom.codigo}, function(err, checaCupom){
//             if(err)
//               res.send(err);
//             if(checaCupom === null){ //checa se ja nao foi gerado o cupom
//               cupom.save(function(err) {
//                 if (err)
//                   res.send(err);      
//                   console.log(cupom);
//                   res.json({ codigo: cupom });
//               });
//             }          
//             else{
//               cupom.codigo = geraCodigo(oferta,req.params.user_id);
//               cupom.save(function(err) {
//                 if (err)
//                   res.send(err);      
//                   console.log(cupom);
//                   res.json({ codigo: cupom });
//               });
//             }
//           })          
//         }else{
//           res.json({ message: 'ja pegou' });
//         }
//     });  

//     function geraCodigo(oferta,user){
//       var categoria = oferta.categoria.substring(0,1);
      
//       var d = new Date();
//       var horaResgate = d.getHours();
//       horaResgate = String.fromCharCode(65 + horaResgate);
      
//       var rand = Math.floor((Math.random()*(999-100))+100);
//       rand= rand.toString();
//       var numero1=rand[0];
//       var numero2=rand[1];
//       var numero3=rand[2];
//       rand = Math.floor((Math.random()*(0-26))+26);
//       var letraRand = String.fromCharCode(65 + rand);

//       var codigo = categoria+numero1+numero3+horaResgate+numero2+letraRand;
//       return codigo;
//     } 
//   }) 

//   .post(function(req, res) {

//     var cupom = new Cupom();
//     cupom.codigo = req.body.codigo;
//     cupom.usuario = req.body.usuario;
//     cupom.oferta = req.body.oferta;

//     cupom.save(function(err) {
//       if (err)
//         res.send(err);

//       res.json({ message: 'Cupom criada!' });
//     });
//   })
// ;

// router.route('/cupons/:user_id')
//   .get(function(req, res) {
//     Cupom.find({usuario: req.params.id}, function(err, cupom) {
//         if (err)
//             res.send(err);
//         res.json(cupom);
//     });   
//   })  
// ;


// router.route('/categorias')

//   .get(function(req,res){
//     Categoria.find(function(err, categorias) {
//           if (err)
//               res.send(err);

//           res.json(categorias);
//       });
//   })

//   .post(function(req, res) {

//     console.log(req.body);
//     var categoria = new Categoria();
    
//     categoria.nome = req.body.nome;
//     categoria.desconto = req.body.desconto;
//     categoria.save(function(err) {
//       if (err)
//         res.send(err);

//       res.json({ message: 'Categoria criada!' });
//     });
//   })

// ;

// router.route('/categorias/:id')

//   .get(function(req, res) {
//     Categoria.findById(req.params.id, function(err, categoria) {
//         if (err)
//             res.send(err);
//         res.json(categoria);
//     });   
//   })  

//   .put(function(req, res) {
//     Categoria.findById(req.params.id, function(err, categoria) {
//         if (err)
//             res.send(err);
//         categoria.nome = req.body.nome;
//         categoria.desconto = req.body.desconto;

//         categoria.save(function(err) {
//             if (err)
//                 res.send(err);

//             res.json({ message: 'categoria updated!' });
//         });
//     });
//   })

//   .delete(function(req, res) {
//     console.log(req.body);
//     Categoria.remove({
//         _id: req.params.id
//     }, function(err, categoria) {
//         if (err)
//             res.send(err);

//         res.json({ message: 'Successfully deleted' });
//     });
//   })
// ;
//app.use('/usuarios', rota);
app.use('/api', rota);


server.listen(8080);
app.use(express.static(__dirname + '/public'));
console.log('MONGO online');