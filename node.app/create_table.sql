CREATE TABLE Produtos (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Nome NVARCHAR(100) NOT NULL,
    Codigo NVARCHAR(50) NOT NULL UNIQUE,
    Preco DECIMAL(10, 2) NOT NULL,
    Descricao NVARCHAR(MAX),
    QuantidadeEstoque INT NOT NULL,
    Avaliacao DECIMAL(3, 2),
    Categoria NVARCHAR(100)
);