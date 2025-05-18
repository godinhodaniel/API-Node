var config = require('./dbconfig');
const sql = require('mssql');

async function getCarros() {
    try{
        let pool = await sql.connect(config);
        let lojas = await pool.request().query("SELECT * FROM carros");
        return lojas.recordsets[0];
    } 
    catch (error) {
        console.log(error);
    }
}

async function updateCarro(carro) {
    try{
        let pool = await sql.connect(config);
        let loja = pool.request
        .input('input_parameter', sql.Int, carro.Id)
        .query(`UPDATE [dbo].[Carros]
        SET
        [Fabricante] = '${carro.Fabricante}',
        [Ano] = '${carro.Ano}',
        [Marca] = '${carro.Marca}',
        [Cidade] = '${carro.Cidade}',
        [Imagem] = '${carro.Imagem}'
        WHERE Id = @input_parameter`);
        return loja.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getCarro(carroId) {
    try {
        let pool = await sql.connect(config);
        let lojas = await pool.request()
            .input('input_parameter', sql.Int, carro.id)
            .query('SELECT * FROM Carros WHERE Id = @input_parameter');
        return loja.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function delCarro(carroId) {
    try {
        let pool = await sql.connect(config);
        let loja = pool.request
        .input('input_parameter', sql.Int, carro.Id)
        .query('DELETE FROM [dbo].[Carros] WHERE Id = @input_parameter');
        return loja.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function addCarro(carro) {
    try {
        let pool = await sql.connect(config);
        let loja = pool.request
        .input('input_parameter', sql.Int, carro.Id)
        .query(`INSERT INTO [dbo].[Carros]
        (
            [Id],
            [Fabricante],
            [Ano],
            [Marca],
            [Cidade],
            [Imagem]
        )
        VALUES
        (
            '${carro.Id}',
            '${carro.Fabricante}',
            '${carro.Ano}',
            '${carro.Marca}',
            '${carro.Cidade}',
            '${carro.Imagem}'
        )`);
        return loja.recordsets;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCarros: getCarros,
    updateCarro: updateCarro,
    getCarro: getCarro,
    delCarro: delCarro,
    addCarro: addCarro
}

