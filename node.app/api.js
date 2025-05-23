var Db = require('./dboperations');
var Produto = require('./produto');
const dboperations = require('./dboperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
    console.log('middleware');
    next(); 
});

router.route('/produtos').get((request, response) => {
    dboperations.getProdutos().then(result => {
        response.json(result);
    }).catch(error => {
        console.error('Erro ao buscar produtos:', error);
        response.status(500).json({ error: 'Erro ao buscar produtos' });
    });
})

router.route('/produtos').patch((request, response) => {
    let produto = { ...request.body };

    dboperations.updateProduto(produto).then(result => {
        response.status(204).json(result);
    }).catch(error => {
        console.error('Erro ao atualizar produto:', error);
        response.status(500).json({ error: 'Erro ao atualizar produto' });
    });
})

router.route('/produtos/:id').get((request, response) => {
    dboperations.getProduto(request.params.id).then(result => {
        response.json(result);
    }).catch(error => {
        console.error('Erro ao buscar produto:', error);
        response.status(500).json({ error: 'Erro ao buscar produto' });
    });
})

router.route('/produtos/:id').delete((request, response) => {
    dboperations.delProduto(request.params.id).then(result => {
        response.status(204).json(result);
    }).catch(error => {
        console.error('Erro ao deletar produto:', error);
        response.status(500).json({ error: 'Erro ao deletar produto' });
    });
})

router.route('/produtos').post((request, response) => {
    let produto = { ...request.body };
    dboperations.addProduto(produto).then(result => {
        response.status(201).json(result);
    }).catch(error => {
        console.error('Erro ao adicionar produto:', error);
        response.status(500).json({ error: 'Erro ao adicionar produto' });
    });
})

router.route('/produtos/:id').put((request, response) => {
    let produto = { ...request.body };
    produto.Id = request.params.id;

    dboperations.updateProduto(produto).then(result => {
        response.status(204).json(result);
    }).catch(error => {
        console.error('Erro ao atualizar produto:', error);
        response.status(500).json({ error: 'Erro ao atualizar produto' });
    });
})

var port = process.env.PORT || 8090;
app.listen(port)
console.log('API rodando na porta ' + port);
