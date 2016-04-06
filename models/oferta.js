var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UsuarioSchema = new Schema({
	nome: String,
    senha: String,
    email: String
})

var DescontoSchema = new Schema({
	nome: String,
	descricao: String
})

var CategoriaSchema = new Schema({
	nome: String,
	desconto: []
})

var OfertaSchema   = new Schema({
    nome: String,  
    descricao: String,
    empresa: String,
    imagem: String,
    logo: String,
    validade: Date,
    desconto: {descricao: String, nome: String},
    categoria: String,
    diasValidos: {},
    cupons: Number
});

var CupomSchema = new Schema({
	codigo: String,
	usuario: String,
	oferta: {},
    usado: Boolean
});

exports.OfertaModel = mongoose.model('Oferta', OfertaSchema);
exports.CategoriaModel = mongoose.model('Categoria', CategoriaSchema);
exports.DescontoModel = mongoose.model('Desconto', DescontoSchema);
exports.CupomModel = mongoose.model('Cupom', CupomSchema);
exports.UsuarioModel = mongoose.model('Usuario', UsuarioSchema);
