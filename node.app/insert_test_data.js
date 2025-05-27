const sql = require('mssql');
const config = require('./dbconfig');

const testProducts = [
    {
        Nome: 'iPhone 15 Pro',
        Codigo: 'IP15P',
        Preco: 9999.99,
        Descricao: 'O mais avançado iPhone com chip A17 Pro, câmera de 48MP e design em titânio.',
        QuantidadeEstoque: 50,
        Avaliacao: 4.8,
        Categoria: 'Smartphones',
        Imagem: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-1-202309?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1693010533602'
    },
    {
        Nome: 'iPhone 15',
        Codigo: 'IP15',
        Preco: 7999.99,
        Descricao: 'iPhone 15 com chip A16 Bionic, câmera dupla de 48MP e design em alumínio.',
        QuantidadeEstoque: 75,
        Avaliacao: 4.7,
        Categoria: 'Smartphones',
        Imagem: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-model-unselect-gallery-2-202309?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1693010533602'
    },
    {
        Nome: 'iPhone 14 Pro',
        Codigo: 'IP14P',
        Preco: 8999.99,
        Descricao: 'iPhone 14 Pro com Dynamic Island, câmera de 48MP e chip A16 Bionic.',
        QuantidadeEstoque: 30,
        Avaliacao: 4.6,
        Categoria: 'Smartphones',
        Imagem: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1663703841896'
    }
];

async function insertTestData() {
    try {
        let pool = await sql.connect(config);
        console.log('Connected to database');

        for (const product of testProducts) {
            const result = await pool.request()
                .query(`INSERT INTO [dbo].[Produtos]
                (
                    [Nome],
                    [Codigo],
                    [Preco],
                    [Descricao],
                    [QuantidadeEstoque],
                    [Avaliacao],
                    [Categoria],
                    [Imagem]
                )
                VALUES
                (
                    '${product.Nome}',
                    '${product.Codigo}',
                    ${product.Preco},
                    '${product.Descricao}',
                    ${product.QuantidadeEstoque},
                    ${product.Avaliacao},
                    '${product.Categoria}',
                    '${product.Imagem}'
                )`);
            console.log(`Inserted product: ${product.Nome}`);
        }

        console.log('All test data inserted successfully');
    } catch (error) {
        console.error('Error inserting test data:', error);
    } finally {
        sql.close();
    }
}

insertTestData(); 