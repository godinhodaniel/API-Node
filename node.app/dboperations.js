var config = require('./dbconfig');
const sql = require('mssql');

async function getProdutos() {
    try {
        let pool = await sql.connect(config);
        let produtos = await pool.request().query("SELECT * FROM Produtos");
        return produtos.recordsets[0];
    } 
    catch (error) {
        console.log(error);
    }
}

async function updateProduto(produto) {
    try {
        let pool = await sql.connect(config);
        let result = pool.request()
        .input('input_parameter', sql.Int, produto.Id)
        .query(`UPDATE [dbo].[Produtos]
        SET
        [Nome] = '${produto.Nome}',
        [Codigo] = '${produto.Codigo}',
        [Preco] = ${produto.Preco},
        [Descricao] = '${produto.Descricao}',
        [QuantidadeEstoque] = ${produto.QuantidadeEstoque},
        [Avaliacao] = ${produto.Avaliacao},
        [Categoria] = '${produto.Categoria}'
        WHERE Id = @input_parameter`);
        return result.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getProduto(produtoId) {
    try {
        let pool = await sql.connect(config);
        let produto = await pool.request()
            .input('input_parameter', sql.Int, produtoId)
            .query('SELECT * FROM Produtos WHERE Id = @input_parameter');
        return produto.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

async function delProduto(produtoId) {
    try {
        let pool = await sql.connect(config);
        let result = pool.request()
        .input('input_parameter', sql.Int, produtoId)
        .query('DELETE FROM [dbo].[Produtos] WHERE Id = @input_parameter');
        return result.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function addProduto(produto) {
    try {
        let pool = await sql.connect(config);
        let result = pool.request()
        .query(`INSERT INTO [dbo].[Produtos]
        (
            [Nome],
            [Codigo],
            [Preco],
            [Descricao],
            [QuantidadeEstoque],
            [Avaliacao],
            [Categoria]
        )
        VALUES
        (
            '${produto.Nome}',
            '${produto.Codigo}',
            ${produto.Preco},
            '${produto.Descricao}',
            ${produto.QuantidadeEstoque},
            ${produto.Avaliacao},
            '${produto.Categoria}'
        )`);
        return result.recordsets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProdutos: getProdutos,
    updateProduto: updateProduto,
    getProduto: getProduto,
    delProduto: delProduto,
    addProduto: addProduto
}

