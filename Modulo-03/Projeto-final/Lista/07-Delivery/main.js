class Cliente {
  #pedidos = [];
  #endereco;
  constructor(nome, endereco) {
    nome = nome.trim();
    if (!(endereco instanceof Endereco))
      throw new Error("Endereço deve ser uma instância de Endereco");

    if (!nome || !endereco) throw new Error("Nome e endereço são obrigatórios");
    if (nome.length < 3)
      throw new Error("Nome deve ter no mínimo 3 caracteres");

    this.nome = nome;
    this.#endereco = endereco;
  }
  get endereco() {
    return this.#endereco.toString();
  }

  fazerPedido(restaurante, itens) {
    if (!(restaurante instanceof Restaurante))
      throw new Error("O restaurante deve ser uma instância de Restaurante");
    if (!Array.isArray(itens))
      throw new Error("Itens deve ser um array de objetos");
    if (itens.length === 0) throw new Error("O pedido não pode ser vazio");
    const pedido = new Pedido(this, restaurante, itens);
    this.#pedidos.push(pedido);
    return pedido;
  }

  consultarPedidos() {}
}

class Endereco {
  constructor(rua, numero, bairro, cidade, estado) {
    rua = rua.trim();
    bairro = bairro.trim();
    cidade = cidade.trim();
    estado = estado.trim();

    if (!rua || !numero || !bairro || !cidade || !estado)
      throw new Error("Todos os campos são obrigatórios");

    if (
      typeof rua !== "string" ||
      typeof bairro !== "string" ||
      typeof cidade !== "string" ||
      typeof estado !== "string"
    ) {
      throw new Error("Todos os campos devem ser do tipo string");
    }

    this.rua = rua;
    this.numero = numero;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
  }

  toString() {
    return `${this.rua}, ${this.numero}, ${this.bairro}, ${this.cidade}, ${this.estado}`;
  }

  mudarEndereco(rua, numero, bairro, cidade, estado) {
    rua = rua.trim();
    bairro = bairro.trim();
    cidade = cidade.trim();
    estado = estado.trim();

    if (!rua || !numero || !bairro || !cidade || !estado)
      throw new Error("Todos os campos são obrigatórios");

    if (
      typeof rua !== "string" ||
      typeof bairro !== "string" ||
      typeof cidade !== "string" ||
      typeof estado !== "string"
    ) {
      throw new Error("Todos os campos devem ser do tipo string");
    }

    this.rua = rua;
    this.numero = numero;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
  }
}

class Pedido {
  constructor(cliente, restaurante, itens) {
    if (!(cliente instanceof Cliente))
      throw new Error("O cliente deve ser uma instância de Cliente");
    if (!(restaurante instanceof Restaurante))
      throw new Error("O restaurante deve ser uma instância de Restaurante");
    if (!Array.isArray(itens))
      throw new Error("Itens deve ser um array de objetos");
    if (itens.length === 0) throw new Error("O pedido não pode ser vazio");
    this.cliente = cliente;
    this.restaurante = restaurante;
    this.itens = itens;
    this.status = "pendente";
  }

  statusLista = ["pendente", "em andamento", "entregue", "cancelado"];

  atualizarStatus(novoStatus) {
    novoStatus = novoStatus.trim().toLowerCase();
    if (!this.statusLista.includes(novoStatus))
      throw new Error("Status inválido");
    this.status = novoStatus;
  }

  calcularValorTotal() {
    let total = 0;
    for (let item of this.itens) {
      total += item.preco;
    }
    return total;
  }
}

class Restaurante {
  #pedidos = [];
  constructor(nome, categoria, endereco, menu) {
    nome = nome.trim();
    categoria = categoria.trim();

    if (!(endereco instanceof Endereco))
      throw new Error("Endereço deve ser uma instância de Endereco");

    if (!nome || !categoria || !endereco)
      throw new Error("Nome, categoria e endereço são obrigatórios");

    if (nome.length < 5)
      throw new Error("Nome deve ter no mínimo 3 caracteres");

    if (categoria.length < 10)
      throw new Error("Categoria deve ter no mínimo 3 caracteres");

    if (!menu || !Array.isArray(menu))
      throw new Error("Menu deve ser um array de objetos");

    if (menu.length === 0) throw new Error("Menu não pode ser vazio");

    this.nome = nome;
    this.categoria = categoria;
    this.endereco = endereco;
    this.menu = menu;
  }

  exibirMenu() {
    let texto = "";
    for (let item of this.menu) {
      texto += `${item.descricao} - R$ ${item.preco}`;
    }
    return texto;
  }

  receberPedido(pedido) {
    if (pedido.restaurante.nome !== this.nome)
      throw new Error("O pedido não é para este restaurante");

    if (!(pedido instanceof Pedido))
      throw new Error("O pedido deve ser uma instância de Pedido");

    for (let item of pedido.itens) {
      if (!this.menu.some((menuItem) => menuItem.descricao === item.descricao))
        throw new Error(`O item ${item.descricao} não existe no menu`);
    }
    this.#pedidos.push(pedido);
    pedido.atualizarStatus("em andamento");
  }

  cancelarPedido(pedido) {
    if (!(pedido instanceof Pedido))
      throw new Error("O pedido deve ser uma instância de Pedido");
    if (this.#pedidos.findIndex((item) => item.descricao === pedido.descricao))
      throw new Error("O item do pedido não existe no menu");
    this.#pedidos.splice(this.#pedidos.indexOf(pedido), 1);
    pedido.atualizarStatus("cancelado");
  }

  mostrarPedidos() {
    let texto = "";
    for (let i = 0; i < this.#pedidos.length; i++) {
      let pedido = this.#pedidos[i];
      let valorTotal = pedido.calcularValorTotal();
      let nomeItens = [];
      for (let item of pedido.itens) {
        nomeItens.push(item.descricao);
      }
      texto += `Número do Pedido: ${i + 1}\nNome do Pedido: ${nomeItens.join(
        ", "
      )}\nValor do Pedido: R$ ${valorTotal.toFixed(2)}\nPedido por: ${
        pedido.cliente.nome
      }\n\n`;
    }
    return texto;
  }

  get pedidos() {
    return this.#pedidos;
  }
}

// cria um novo endereço
const endereco = new Endereco(
  "Rua dos bobos",
  "0",
  "Centro",
  "São Paulo",
  "SP"
);
console.log(endereco.toString()); //deverá imprimir Rua dos bobos, 0, Centro, São Paulo, SP

// tenta criar um novo endereço com campos vazios/inválidos
// const endereco2 = new Endereco("", "", "", "", "");

// tenta criar um novo endereço com campos do tipo errado
// const endereco3 = new Endereco(0, 0, 0, 0, 0);

// cria um novo cliente
const cliente = new Cliente("João", endereco);
console.log(cliente.nome); // deverá imprimir "João"
console.log(cliente.endereco); // deverá imprimir o endereço

const cliente1 = new Cliente("Maria", endereco);

// cria um novo restaurante
const restaurante = new Restaurante(
  "Comida Boa",
  "Comida Brasileira",
  endereco,
  [
    { descricao: "Prato Feito", preco: 12.5 },
    { descricao: "Refrigerante", preco: 8 },
  ]
);
console.log(restaurante.nome); // deverá imprimir "Comida Boa"
console.log(restaurante.categoria); // deverá imprimir "Comida Brasileira"
console.log(restaurante.exibirMenu()); // deverá imprimir "Prato Feito - R$ 12.5 \n Refrigerante - R$ 8"
// criar pedido
const pedido = new Pedido(cliente, restaurante, [
  { descricao: "Prato Feito", preco: 12.5 },
  { descricao: "Refrigerante", preco: 8 },
]);
console.log(pedido.status); // deverá imprimir "pendente"
console.log(pedido.calcularValorTotal()); //deverá imprimir 20.5

const pedido1 = new Pedido(cliente1, restaurante, [
  { descricao: "Prato Feito", preco: 12.5 },
  { descricao: "Refrigerante", preco: 8 },
  { descricao: "Refrigerante", preco: 8 },
  { descricao: "Refrigerante", preco: 8 },
]);

// cliente fazer pedido e restaurante receber pedido
restaurante.receberPedido(cliente.fazerPedido(restaurante, pedido.itens));
restaurante.receberPedido(cliente1.fazerPedido(restaurante, pedido1.itens));

console.log(restaurante.pedidos.length); // deverá imprimir 1
console.log(restaurante.mostrarPedidos()); // deverá imprimir "Pedido 1 - R$ 20.5 - Pedido por: João"

//atualizar status do pedido
restaurante.pedidos[0].atualizarStatus("entregue");
console.log(restaurante.pedidos[0].status); // deverá imprimir "entregue"
// Cancelar pedido
restaurante.cancelarPedido(restaurante.pedidos[0]);
console.log(restaurante.pedidos.length); // devrá imprimir 0

// criar pedido com item que não existe no menu
// const pedido2 = new Pedido(cliente, restaurante, [
//   { descricao: "Prato Feito", preco: 12.5 },
//   { descricao: "Refrigerante", preco: 8 },
//   { descricao: "Sobremesa", preco: 8 },
// ]);

// restaurante.receberPedido(pedido2); // deverá imprimir "O item Sobremesa não existe no menu"

// criar cliente com nome menor que 3 caracteres
// const cliente2 = new Cliente("oi", endereco);
