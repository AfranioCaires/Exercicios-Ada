class Tarefa {
  constructor(descricao, dataVencimento) {
    if (!descricao || !dataVencimento)
      throw new Error("Descrição e data de vencimento são obrigatórios");
    if (!(dataVencimento instanceof Date))
      throw new Error("Data de vencimento inválida");
    if (typeof descricao !== "string")
      throw new Error("Descrição deve ser um texto");
    if (descricao.trim().length < 3)
      throw new Error("Descrição deve ter pelo menos 3 caracteres");

    this.descricao = descricao.trim();
    this.dataVencimento = dataVencimento.toLocaleDateString("pt-BR");
    this.concluida = false;
  }

  marcarConcluida() {
    this.concluida = true;
  }
}

class ListaTarefas {
  constructor(nome) {
    this.nome = nome;
    this.tarefas = [];
  }

  adicionarTarefa(tarefa) {
    if (!(tarefa instanceof Tarefa))
      throw new Error("Parâmetro deve ser uma instância de Tarefa");
    this.tarefas.push(tarefa);
  }

  marcarTarefaConcluida(indice) {
    if (indice >= 0 && indice < this.tarefas.length)
      this.tarefas[indice].marcarConcluida();
    else throw new Error("Índice inválido");
  }
}

class Categoria {
  constructor(nome) {
    if (!nome || typeof nome !== "string" || nome.trim().length < 3)
      throw new Error("Nome inválido");

    this.nome = nome;
    this.listasTarefas = [];
  }

  adicionarListaTarefas(listaTarefas) {
    if (!(listaTarefas instanceof ListaTarefas))
      throw new Error("Parâmetro deve ser uma instância de ListaTarefas");
    this.listasTarefas.push(listaTarefas);
  }
}

class Usuario {
  constructor(nome) {
    if (!nome || typeof nome !== "string" || nome.trim().length < 3)
      throw new Error("Nome inválido");
    this.nome = nome;
    this.categorias = [];
  }

  adicionarCategoria(categoria) {
    if (!(categoria instanceof Categoria))
      throw new Error("Parâmetro deve ser uma instância de Categoria");
    this.categorias.push(categoria);
  }
}

const usuario = new Usuario("Fulano");
const categoria = new Categoria("Compras");
const lista1 = new ListaTarefas("Mercado");
const lista2 = new ListaTarefas("Viagem");
const tarefa1 = new Tarefa("Comprar pão", new Date("2021-09-20"));
const tarefa2 = new Tarefa("Comprar leite", new Date("2021-09-20"));
const tarefa3 = new Tarefa("Comprar café", new Date("2021-09-20"));
const tarefa4 = new Tarefa("Comprar passagem", new Date("2021-09-20"));
const tarefa5 = new Tarefa("Reservar hotel", new Date("2021-09-20"));
const tarefa6 = new Tarefa("Arrumar malas", new Date("2021-09-20"));

lista1.adicionarTarefa(tarefa1);
lista1.adicionarTarefa(tarefa2);
lista1.adicionarTarefa(tarefa3);
lista2.adicionarTarefa(tarefa4);
lista2.adicionarTarefa(tarefa5);
lista2.adicionarTarefa(tarefa6);
categoria.adicionarListaTarefas(lista1);
categoria.adicionarListaTarefas(lista2);
usuario.adicionarCategoria(categoria);
usuario.categorias[0].listasTarefas[0].marcarTarefaConcluida(1);
usuario.categorias[0].listasTarefas[1].marcarTarefaConcluida(2);
console.log(usuario);
