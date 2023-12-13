class Projeto {
  constructor(nome) {
    if (!nome) throw new Error("O projeto deve ter um nome");
    if (typeof nome !== "string")
      throw new Error("O nome do projeto deve ser uma string");
    nome = nome.trim();
    if (nome.length < 3)
      throw new Error("O nome do projeto deve ter no mínimo 3 caracteres");
    this.nome = nome;
    this.tarefas = [];
  }

  adicionarTarefa(tarefa) {
    if (!(tarefa instanceof Tarefa))
      throw new Error("A tarefa deve ser um objeto Tarefa");
    this.tarefas.push(tarefa);
  }

  exibirInformacoes() {
    console.log(`Projeto: ${this.nome}`);
    console.log("Tarefas:");
    this.tarefas.forEach((tarefa) => {
      tarefa.exibirInformacoes();
    });
  }
}

class Tarefa {
  constructor(nome, progresso) {
    if (!nome) throw new Error("A tarefa deve ter um nome");
    if (typeof nome !== "string")
      throw new Error("O nome da tarefa deve ser uma string");
    nome = nome.trim();
    if (nome.length < 3)
      throw new Error("O nome da tarefa deve ter no mínimo 3 caracteres");
    if (typeof progresso !== "number")
      throw new Error("O progresso deve ser um número");
    if (progresso < 0 || progresso > 100)
      throw new Error("O progresso deve estar entre 0 e 100");
    this.nome = nome;
    this.progresso = progresso;
    this.colaboradores = [];
  }

  adicionarColaborador(colaborador) {
    if (!(colaborador instanceof Colaborador))
      throw new Error("O colaborador deve ser um objeto Colaborador");
    this.colaboradores.push(colaborador);
  }

  exibirInformacoes() {
    console.log(`- Tarefa: ${this.nome}`);
    console.log(`  Progresso: ${this.progresso}%`);
    console.log("  Colaboradores:");
    this.colaboradores.forEach((colaborador) => {
      console.log(`    - ${colaborador.nome}`);
    });
  }
}

class Equipe {
  constructor() {
    this.colaboradores = [];
  }

  adicionarColaborador(colaborador) {
    if (!(colaborador instanceof Colaborador))
      this.colaboradores.push(colaborador);
  }
}

class Colaborador {
  constructor(nome, habilidades) {
    if (!nome) throw new Error("O colaborador deve ter um nome");
    if (typeof nome !== "string")
      throw new Error("O nome do colaborador deve ser uma string");
    nome = nome.trim();
    if (nome.length < 3)
      throw new Error("O nome do colaborador deve ter no mínimo 3 caracteres");
    if (!habilidades || !Array.isArray(habilidades))
      throw new Error("O colaborador deve ter habilidades");
    if (habilidades.length < 1)
      throw new Error("O colaborador deve ter no mínimo 1 habilidade");
    habilidades.forEach((habilidade) => {
      if (typeof habilidade !== "string")
        throw new Error("A habilidade deve ser uma string");
      habilidade = habilidade.trim();
      if (habilidade.length < 2)
        throw new Error(
          "A habilidade do colaborador deve ter no mínimo 3 caracteres"
        );
    });
    this.nome = nome;
    this.habilidades = habilidades;
  }
}

// Example usage:
const projeto = new Projeto("Sistema de Gerenciamento de Projetos");

const tarefa1 = new Tarefa("Implementar autenticação", 50);
const tarefa2 = new Tarefa("Criar interface de usuário", 30);

const equipe = new Equipe();

const colaborador1 = new Colaborador("João", ["JavaScript", "HTML", "CSS"]);
const colaborador2 = new Colaborador("Maria", ["Python", "SQL"]);
const colaborador3 = new Colaborador("Pedro", ["Java", "C#"]);

tarefa1.adicionarColaborador(colaborador1);
tarefa1.adicionarColaborador(colaborador2);
tarefa2.adicionarColaborador(colaborador3);

projeto.adicionarTarefa(tarefa1);
projeto.adicionarTarefa(tarefa2);

equipe.adicionarColaborador(colaborador1);
equipe.adicionarColaborador(colaborador2);
equipe.adicionarColaborador(colaborador3);

projeto.exibirInformacoes();
