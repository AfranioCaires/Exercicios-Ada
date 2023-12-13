class Produto {
  constructor(nome, preco, quantidade) {
    if (!nome || !preco || !quantidade) throw new Error("Produto inválido");
    if (typeof nome !== "string") throw new Error("Nome inválido");
    if (typeof preco !== "number") throw new Error("Preço inválido");
    if (typeof quantidade !== "number") throw new Error("Quantidade inválida");

    nome = nome.trim();
    if (nome.length === 0) throw new Error("Nome inválido");
    if (preco <= 0) throw new Error("Preço inválido");
    if (quantidade <= 0) throw new Error("Quantidade inválida");

    this.nome = nome;
    this.preco = preco;
    this.quantidade = quantidade;
  }
}

class Estoque {
  constructor() {
    this.produtos = [];
  }

  adicionarProduto(produto) {
    if (!(produto instanceof Produto)) throw new Error("Produto inválido");
    if (this.produtos.find((p) => p.nome === produto.nome))
      throw new Error("Produto já existe no estoque");
    this.produtos.push(produto);
  }

  atualizarEstoque(produto, quantidade) {
    const produtoNoEstoque = this.produtos.find((p) => p.nome === produto.nome);
    if (produtoNoEstoque) produtoNoEstoque.quantidade -= quantidade;
  }
}

class CarrinhoDeCompras {
  constructor() {
    this.produtos = [];
  }

  calcularValorTotal() {
    let valorTotal = 0;
    for (const produto of this.produtos) valorTotal += produto.preco;
    return valorTotal;
  }
}

class Cliente {
  constructor(nome) {
    if (!nome) throw new Error("Cliente inválido");
    if (typeof nome !== "string") throw new Error("Nome inválido");
    nome = nome.trim();
    if (nome.length < 2) throw new Error("Nome inválido");

    this.nome = nome;
    this.carrinhoDeCompras = new CarrinhoDeCompras();
  }

  adicionarProdutoAoCarrinho(produto) {
    if (!(produto instanceof Produto)) throw new Error("Produto inválido");
    if (this.carrinhoDeCompras.produtos.find((p) => p.nome === produto.nome))
      throw new Error("Produto já existe no carrinho");
    this.carrinhoDeCompras.produtos.push(produto);
  }

  realizarCompra(estoque) {
    for (const produto of this.carrinhoDeCompras.produtos) {
      estoque.atualizarEstoque(produto, 1);
    }
    this.carrinhoDeCompras.produtos = [];
  }
}

const estoque = new Estoque();
const cliente = new Cliente("João");
const produto1 = new Produto("Arroz", 10, 2);
const produto2 = new Produto("Feijão", 5, 3);
const produto3 = new Produto("Macarrão", 7, 1);
const produto4 = new Produto("Carne", 30, 2);
const produto5 = new Produto("Ovo", 1, 12);

estoque.adicionarProduto(produto1);
estoque.adicionarProduto(produto2);
estoque.adicionarProduto(produto3);
estoque.adicionarProduto(produto4);
estoque.adicionarProduto(produto5);

cliente.adicionarProdutoAoCarrinho(produto1);
cliente.adicionarProdutoAoCarrinho(produto2);
cliente.adicionarProdutoAoCarrinho(produto3);
cliente.adicionarProdutoAoCarrinho(produto4);
cliente.adicionarProdutoAoCarrinho(produto5);

console.log(cliente.carrinhoDeCompras.calcularValorTotal());
cliente.realizarCompra(estoque);
console.log(cliente.carrinhoDeCompras.calcularValorTotal());
console.log(estoque.produtos);
