class Tarefa {
  constructor(descricao, prioridade, status) {
    if (!descricao || !prioridade || !status)
      throw new Error(
        "Os parâmetros 'descricao', 'prioridade' e 'status' são obrigatórios!"
      );

    if (typeof descricao !== "string" || descricao.length === 0)
      throw new Error("A descrição deve ser uma string não vazia!");

    prioridade = prioridade.toLowerCase();
    if (
      !["baixa", "media", "média", "alta"].includes(prioridade) ||
      typeof prioridade !== "string"
    )
      throw new Error(
        "A prioridade deve ser uma string contendo a prioridade. Prioridades aceitas: baixa, média ou alta!"
      );

    status = status.toLowerCase();
    if (!["pendente", "concluída"].includes(status))
      throw new Error("O status deve ser pendente ou concluída!");

    this.descricao = descricao;
    this.prioridade = prioridade;
    this.status = status;
  }
}

class ListaTarefas {
  #tarefas = [];
  constructor(nome) {
    this.nome = nome;
  }

  adicionarTarefa(tarefa) {
    if (!(tarefa instanceof Tarefa))
      throw new Error("O parâmetro tarefa deve ser do tipo Tarefa!");
    this.#tarefas.push(tarefa);
  }

  removerTarefa(tarefa) {
    const index = this.tarefas.indexOf(tarefa);
    if (index > -1) {
      this.#tarefas.splice(index, 1);
    } else {
      throw new Error("A tarefa informada não foi encontrada!");
    }
  }

  marcarConcluida(tarefa) {
    const index = this.#tarefas.indexOf(tarefa);
    if (index > -1) {
      this.#tarefas[index].status = "concluída";
    } else {
      throw new Error("A tarefa informada não foi encontrada!");
    }
  }

  exibirLista() {
    return this.#tarefas;
  }

  calcularEstatisticas() {
    const estatisticas = {
      total: this.#tarefas.length,
      concluidas: this.#tarefas.filter(
        (tarefa) => tarefa.status === "concluída"
      ).length,
      pendentes: this.#tarefas.filter((tarefa) => tarefa.status === "pendente")
        .length,
    };
    return estatisticas;
  }
}

class AplicativoToDoList {
  #listasTarefas = [];
  constructor() {
    this.listaAtual = null;
  }

  criarLista(nome) {
    if (!nome || typeof nome !== "string")
      throw new Error("O nome da lista deve ser uma string não vazia!");
    const novaLista = new ListaTarefas(nome);
    this.#listasTarefas.push(novaLista);
    this.listaAtual = novaLista;
  }

  selecionarLista(nome) {
    const listaSelecionada = this.#listasTarefas.find(
      (lista) => lista.nome === nome
    );
    if (listaSelecionada) {
      this.listaAtual = listaSelecionada;
      return listaSelecionada;
    } else throw new Error("A lista informada não foi encontrada!");
  }

  exibirListasDisponiveis() {
    return this.#listasTarefas.map((lista) => lista.nome);
  }
}

const tarefa1 = new Tarefa("Estudar JavaScript", "alta", "pendente");
const tarefa2 = new Tarefa("Fazer exercícios de POO", "média", "pendente");
const tarefa3 = new Tarefa("Comprar mantimentos", "baixa", "pendente");
const tarefa4 = new Tarefa("Correr no parque", "média", "pendente");

const appToDoList = new AplicativoToDoList();
appToDoList.criarLista("Estudos");
appToDoList.selecionarLista("Estudos").adicionarTarefa(tarefa1);
appToDoList.selecionarLista("Estudos").adicionarTarefa(tarefa2);
appToDoList.criarLista("Compras");
appToDoList.selecionarLista("Compras").adicionarTarefa(tarefa3);
appToDoList.criarLista("Pessoal");
appToDoList.selecionarLista("Pessoal").adicionarTarefa(tarefa4);

// Exibir listas disponíveis
console.log(appToDoList.exibirListasDisponiveis());

// Exibir lista de tarefas atual
appToDoList.listaAtual.exibirLista();

// Marcar tarefa como concluída
appToDoList.selecionarLista("Estudos");
appToDoList.listaAtual.marcarConcluida(tarefa1);

// Exibir estatísticas da lista
console.log(appToDoList.listaAtual.calcularEstatisticas());
