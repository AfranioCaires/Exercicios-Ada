class Produto {
  constructor(nome, preco, quantidade) {
    if (typeof nome !== "string" || nome.trim() === "")
      throw new Error("O nome do produto deve ser uma string não vazia.");

    if (typeof preco !== "number" || preco <= 0)
      throw new Error("O preço do produto deve ser um número positivo.");

    if (typeof quantidade !== "number" || quantidade < 0 || isNaN(quantidade))
      throw new Error(
        "A quantidade do produto deve ser um número não negativo."
      );

    this.nome = nome;
    this.preco = preco;
    this.quantidade = quantidade;
  }
}

class Fornecedor {
  constructor(nome) {
    if (typeof nome !== "string" || nome.trim() === "")
      throw new Error("O nome do fornecedor deve ser uma string não vazia.");
    this.pedidos = [];
    this.nome = nome;
  }

  receberPedido(pedido) {
    if (!(pedido instanceof Pedido))
      throw new Error("O objeto fornecido não é uma instância de Pedido.");

    this.pedidos.push(pedido);
  }

  entregarPedido(pedido) {
    if (!(pedido instanceof Pedido))
      throw new Error("O objeto fornecido não é uma instância de Pedido.");

    const pedidoNoFornecedor = this.pedidos.find(
      (p) => p.produto.nome === pedido.produto.nome
    );

    if (!pedidoNoFornecedor)
      throw new Error("O fornecedor não possui esse pedido.");

    this.pedidos = this.pedidos.filter(
      (p) => p.produto.nome !== pedido.produto.nome
    );

    return { nome: pedido.produto.nome, quantidade: pedido.quantidade };
  }
}

class Pedido {
  constructor(produto, quantidade) {
    if (!(produto instanceof Produto))
      throw new Error("O objeto fornecido não é uma instância de Produto.");

    if (typeof quantidade !== "number" || quantidade <= 0)
      throw new Error("A quantidade do pedido deve ser um número positivo.");

    this.produto = produto;
    this.quantidade = quantidade;
  }
}

class Estoque {
  constructor() {
    this.produtos = [];
  }

  adicionarProduto(produto) {
    if (!(produto instanceof Produto))
      throw new Error("O objeto fornecido não é uma instância de Produto.");

    this.produtos.push(produto);
  }

  fazerPedido(fornecedor, produto, quantidadeMinima) {
    if (!(fornecedor instanceof Fornecedor))
      throw new Error("O objeto fornecido não é uma instância de Fornecedor.");

    const produtoNoEstoque = this.produtos.find((p) => p.nome === produto.nome);

    if (produtoNoEstoque && produtoNoEstoque.quantidade < quantidadeMinima) {
      const quantidadePedido = Math.max(
        0,
        quantidadeMinima - produtoNoEstoque.quantidade
      );
      const pedido = new Pedido(produto, quantidadePedido);
      fornecedor.receberPedido(pedido);
      return produto;
    }
  }

  registrarChegadaProduto(produto) {
    const produtoNoEstoque = this.produtos.find((p) => p.nome === produto.nome);

    if (produtoNoEstoque) {
      produtoNoEstoque.quantidade += produto.quantidade;
    } else {
      produto.quantidade = produto.quantidade;
      this.adicionarProduto(produto);
    }
  }
}

const estoque = new Estoque();
const fornecedor = new Fornecedor("Fornecedor A");
const produto1 = new Produto("Produto 1", 5, 100);
const produto2 = new Produto("Produto 2", 4, 5);

estoque.adicionarProduto(produto1);
estoque.adicionarProduto(produto2);

let produtoPedido = estoque.fazerPedido(fornecedor, produto1, 101);
if (produtoPedido) {
  estoque.registrarChegadaProduto(produtoPedido);
}
console.log(estoque);
