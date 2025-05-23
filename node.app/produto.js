class Produto {
    constructor(id, nome, codigo, preco, descricao, quantidadeEstoque, avaliacao, categoria) {
        this.Id = id;
        this.Nome = nome;
        this.Codigo = codigo;
        this.Preco = preco;
        this.Descricao = descricao;
        this.QuantidadeEstoque = quantidadeEstoque;
        this.Avaliacao = avaliacao;
        this.Categoria = categoria;
    }
}

module.exports = Produto; 