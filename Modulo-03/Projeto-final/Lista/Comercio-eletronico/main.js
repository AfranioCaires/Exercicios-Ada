class Produto {
  constructor(nome, preco) {
    if (!nome || !preco)
      throw new Error("Os campos nome e preco são obrigatórios.");
    if (typeof nome !== "string")
      throw new Error("O campo nome deve ser do tipo string.");
    if (typeof preco !== "number")
      throw new Error("O campo preco deve ser do tipo number.");

    nome = nome.trim().toLowerCase();
    if (nome.length < 3)
      throw new Error("O campo nome deve ter no mínimo 3 caracteres.");

    if (preco < 0) throw new Error("O campo preco deve ser positivo.");
    this.nome = nome;
    this.preco = preco;
  }
}

class CarrinhoDeCompras {
  #produtos = [];
  adicionarProduto(produto) {
    if (produto instanceof Produto) {
      this.#produtos.push(produto);
    } else {
      console.log("Erro: O objeto adicionado não é um produto válido.");
    }
  }

  calcularTotalPedido() {
    let total = 0;
    for (let produto of this.#produtos) {
      total += produto.preco;
    }
    return total;
  }
}

class Cliente {
  #pedidos = [];
  constructor(nome) {
    if (!nome) throw new Error("O campo nome é obrigatório.");
    if (typeof nome !== "string")
      throw new Error("O campo nome deve ser do tipo string.");

    nome = nome.trim().toLowerCase();
    if (nome.length < 3)
      throw new Error("O campo nome deve ter no mínimo 3 caracteres.");

    this.nome = nome;
  }

  realizarPedido(carrinho) {
    if (!(carrinho instanceof CarrinhoDeCompras))
      throw new Error("O objeto passado não é um carrinho de compras válido.");

    const pedido = new Pedido(this, carrinho);
    this.#pedidos.push(pedido);
    return pedido;
  }
}

class Pedido {
  constructor(cliente, carrinho) {
    if (!(cliente instanceof Cliente))
      throw new Error("O objeto cliente passado não é um cliente válido.");
    if (!(carrinho instanceof CarrinhoDeCompras))
      throw new Error("O objeto carrinho passado não é um carrinho válido.");

    this.cliente = cliente;
    this.carrinho = carrinho;
    this.statusEntrega = "pendente";
  }

  rastrearStatusEntrega() {
    return this.statusEntrega;
  }

  alterarStatusEntrega(status) {
    if (typeof status !== "string")
      throw new Error("O campo status deve ser do tipo string.");

    status = status.trim().toLowerCase();
    if (!["pendente", "em andamento", "entregue"].includes(status))
      throw new Error("O campo status deve ser válido.");

    this.statusEntrega = status;
  }
}

const cliente = new Cliente("João");
const carrinho = new CarrinhoDeCompras();
const produto1 = new Produto("Camisa", 50);
const produto2 = new Produto("Calça", 100);
const produto3 = new Produto("Meia", 10);
carrinho.adicionarProduto(produto1);
carrinho.adicionarProduto(produto2);
carrinho.adicionarProduto(produto3);
const pedido = cliente.realizarPedido(carrinho);
console.log(pedido.rastrearStatusEntrega());
console.log(carrinho.calcularTotalPedido());
