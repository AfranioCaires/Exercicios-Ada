class Produto {
  #estoque = 0;
  constructor(nome, preco) {
    if (!nome || !preco) throw new Error("Preencha todos os campos");
    if (typeof nome !== "string") throw new Error("Nome inválido");
    if (typeof preco !== "number") throw new Error("Preço inválido");
    if (preco < 0) throw new Error("Preço inválido");
    this.nome = nome;
    this.preco = preco;
  }

  get estoquePositivo() {
    return this.#estoque > 0;
  }

  get verEstoque() {
    return this.#estoque;
  }
  set alterarEstoque(quantidade) {
    if (typeof quantidade !== "number") throw new Error("Estoque inválido");
    if (quantidade < 0) throw new Error("Estoque inválido");
    this.#estoque = quantidade;
  }
}

class ProdutoEletronico extends Produto {
  constructor(nome, preco, voltagem) {
    super(nome, preco);
    if (!voltagem) throw new Error("Preencha todos os campos");
    if (typeof voltagem !== "number") throw new Error("Voltagem inválida");
    if (voltagem < 0) throw new Error("Voltagem inválida");
    this.voltagem = voltagem;
  }
}

class ProdutoAliementicio extends Produto {
  constructor(nome, preco, validade) {
    super(nome, preco);
    if (!validade) throw new Error("Preencha todos os campos");
    if (typeof validade !== "string") throw new Error("Validade inválida");
    this.validade = validade;
  }
}

class Carrinho {
  #produtos = [];
  adicionarProduto(produto) {
    if (!(produto instanceof Produto))
      throw new Error("Produto inválido, tente novamente");
    if (produto.verEstoque === 0)
      throw new Error("Produto sem estoque, tente novamente");

    if (produto.estoquePositivo) {
      produto.alterarEstoque = produto.verEstoque - 1;
      this.#produtos.push(produto);
    }
  }
  removerProduto(produto) {
    if (!(produto instanceof Produto))
      throw new Error("Produto inválido, tente novamente");

    const item = this.#produtos.find((item) => item.nome === produto.nome);
    const index = this.#produtos.indexOf(item);

    if (index !== -1) {
      this.#produtos.splice(index, 1);
      produto.alterarEstoque = produto.verEstoque + 1;
    } else {
      throw new Error("Produto não encontrado");
    }
  }

  calcularTotal() {
    let total = 0;
    this.#produtos.forEach((item) => {
      total += item.preco;
    });

    return total;
  }

  get verProdutos() {
    return this.#produtos;
  }
}

class Cliente {
  constructor(nome, idade, email) {
    if (!nome || !idade || !email) throw new Error("Preencha todos os campos");
    if (typeof nome !== "string") throw new Error("Nome inválido");
    if (typeof idade !== "number") throw new Error("Idade inválida");
    if (typeof email !== "string") throw new Error("Email inválido");

    this.nome = nome;
    this.idade = idade;
    this.email = email;
    this.carrinho = new Carrinho();
  }
}

// --- TESTES ---

// teste 1: criar cliente e testar com campos invalidos
const cliente = new Cliente("João", 25, "teste@email.com");
// const cliente2 = new Cliente("Maria", 30); Erro email não preenchido
// const cliente3 = new Cliente("Maria", "30", "email"); Erro idade inválida
// const cliente4 = new Cliente(30, "Maria", "email"); Erro nome inválido

// teste 2: criar produto e testar com campos invalidos
const camisa = new Produto("Camisa", 50);
// const camisa = new Produto("Camisa", -50); Erro preço negativo
// const camisa = new Produto("Camisa"); Erro preço não preenchido
// const camisa = new Produto("Camisa", "50"); Erro preço inválido

// teste 3: criar produto eletronico e testar com campos invalidos
const celular = new ProdutoEletronico("Celular", 1000, 220);
celular.alterarEstoque = 5;
// const celular = new ProdutoEletronico("Celular", 1000); Erro voltagem não preenchida
// const celular = new ProdutoEletronico("Celular", 1000, -220); Erro voltagem negativa
// const celular = new ProdutoEletronico("Celular", 1000, "220"); Erro voltagem inválida

// teste 4: criar produto alimenticio e testar com campos invalidos
const biscoito = new ProdutoAliementicio("Biscoito", 5, "10/10/2021");
// const biscoito = new ProdutoAliementicio("Biscoito", 5); Erro validade não preenchida
// const biscoito = new ProdutoAliementicio("Biscoito", 5, 10); Erro validade inválida
// const biscoito = new ProdutoAliementicio("Biscoito", 5, 10/10/2021); Erro validade inválida

// teste 5: adicionar produto no carrinho
// cliente.carrinho.adicionarProduto(camisa); erro estoque vazio
camisa.alterarEstoque = 2;
cliente.carrinho.adicionarProduto(camisa);
console.log(cliente.carrinho.calcularTotal());

// teste 6: remover produto do carrinho
const calca = new Produto("Calça", 100);
calca.alterarEstoque = 10;
cliente.carrinho.adicionarProduto(calca);
cliente.carrinho.adicionarProduto(celular);
cliente.carrinho.removerProduto(camisa);

// teste 7: ver produtos do carrinho e calcular total
console.log(cliente.carrinho.verProdutos);
console.log(cliente.carrinho.calcularTotal());

// teste 8: ProdutoEletronico calcular preço com desconto
console.log(celular.calcularPrecoComDesconto(60));

console.log(cliente);
