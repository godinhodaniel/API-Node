const config = {
    server: 'localhost',
    authentication: { 
        type: 'default',    
        options: {
            userName: 'sa',
            password: 'teste123'
        }
    },
    options: {
        encrypt: false,
        database: 'CadastroProdutos'
    },
    port: 49907
}

module.exports = config
