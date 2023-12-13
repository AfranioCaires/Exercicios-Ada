class Pessoa {
  constructor(nome, idade) {
    if (!nome) throw new Error("Nome é obrigatório");
    if (!idade || typeof idade !== "number")
      throw new Error("Idade é obrigatória e deve ser um número");
    if (idade < 0) throw new Error("Idade deve ser um número positivo");
    nome = nome.trim();
    if (nome.length < 3)
      throw new Error("Nome deve conter pelo menos 3 caracteres");
    this.nome = nome;
    this.idade = idade;
  }
}

class Aluno extends Pessoa {
  constructor(nome, idade, matricula) {
    super(nome, idade);
    if (!matricula) throw new Error("Matrícula é obrigatória");

    this.matricula = matricula;
    this.disciplinas = [];
  }

  matricular(disciplina) {
    if (!disciplina instanceof Disciplina)
      throw new Error("Disciplina deve ser uma instância de Disciplina");
    this.disciplinas.push(disciplina);
  }

  calcularMedia(disciplina) {
    if (!disciplina instanceof Disciplina)
      throw new Error("Disciplina deve ser uma instância de Disciplina");
    const notas = disciplina.notas.filter((nota) => nota.aluno === this);
    const somaNotas = notas.reduce((total, nota) => total + nota.valor, 0);
    return somaNotas / notas.length;
  }

  verificarStatusAprovacao(disciplina) {
    if (!disciplina instanceof Disciplina)
      throw new Error("Disciplina deve ser uma instância de Disciplina");
    const media = this.calcularMedia(disciplina);
    return media >= 7 ? "Aprovado" : "Reprovado";
  }
}

class Professor extends Pessoa {
  constructor(nome, idade, disciplinas) {
    super(nome, idade);
    if (!disciplinas || !Array.isArray(disciplinas))
      throw new Error("Disciplinas deve ser um array");

    this.disciplinas = disciplinas;
  }

  atribuirNota(aluno, disciplina, valor) {
    if (!aluno || !disciplina || typeof valor !== "number")
      throw new Error(
        "Aluno, disciplina e valor são obrigatórios. Valor deve ser um número."
      );
    if (!aluno instanceof Aluno)
      throw new Error("Aluno deve ser uma instância de Aluno");
    if (!disciplina instanceof Disciplina)
      throw new Error("Disciplina deve ser uma instância de Disciplina");
    const nota = { aluno, disciplina, valor };
    disciplina.notas.push(nota);
  }
}

class Disciplina {
  constructor(nome) {
    if (!nome) throw new Error("Nome é obrigatório");

    this.nome = nome;
    this.alunosMatriculados = [];
    this.notas = [];
  }

  matricularAluno(aluno) {
    if (!aluno instanceof Aluno)
      throw new Error("Aluno deve ser uma instância de Aluno");
    this.alunosMatriculados.push(aluno);
  }
}

class Turma {
  constructor(nome, disciplinas, alunos) {
    if (!nome) throw new Error("Nome é obrigatório");
    if (!disciplinas || !Array.isArray(disciplinas))
      throw new Error("Disciplinas deve ser um array");
    if (!alunos || !Array.isArray(alunos))
      throw new Error("Alunos deve ser um array");

    this.nome = nome;
    this.disciplinas = disciplinas;
    this.alunos = alunos;
  }
}

const disciplina1 = new Disciplina("Matemática");
const disciplina2 = new Disciplina("Português");
const disciplina3 = new Disciplina("História");
const disciplina4 = new Disciplina("Geografia");
const disciplina5 = new Disciplina("Ciências");
const disciplina6 = new Disciplina("Inglês");

const aluno1 = new Aluno("João", 15, "123");
const aluno2 = new Aluno("Maria", 16, "456");
const aluno3 = new Aluno("José", 14, "789");
const aluno4 = new Aluno("Ana", 15, "101");
const aluno5 = new Aluno("Pedro", 16, "112");
const aluno6 = new Aluno("Paula", 14, "131");

const professor1 = new Professor("Carlos", 35, [
  disciplina1,
  disciplina2,
  disciplina3,
]);

const professor2 = new Professor("Mariana", 40, [
  disciplina4,
  disciplina5,
  disciplina6,
]);

const turma1 = new Turma(
  "Turma A",
  [
    disciplina1,
    disciplina2,
    disciplina3,
    disciplina4,
    disciplina5,
    disciplina6,
  ],
  [aluno1, aluno2, aluno3, aluno4, aluno5, aluno6]
);

disciplina1.matricularAluno(aluno1);
disciplina1.matricularAluno(aluno2);
disciplina1.matricularAluno(aluno3);
disciplina1.matricularAluno(aluno4);

disciplina2.matricularAluno(aluno1);
disciplina2.matricularAluno(aluno2);
disciplina2.matricularAluno(aluno3);
disciplina2.matricularAluno(aluno4);

disciplina3.matricularAluno(aluno1);
disciplina3.matricularAluno(aluno2);

disciplina4.matricularAluno(aluno3);
disciplina4.matricularAluno(aluno4);
disciplina4.matricularAluno(aluno5);

disciplina5.matricularAluno(aluno3);
disciplina5.matricularAluno(aluno4);
disciplina5.matricularAluno(aluno5);

disciplina6.matricularAluno(aluno3);
disciplina6.matricularAluno(aluno4);

professor1.atribuirNota(aluno1, disciplina1, 10);
professor1.atribuirNota(aluno1, disciplina2, 10);
professor1.atribuirNota(aluno1, disciplina3, 10);

professor1.atribuirNota(aluno2, disciplina1, 10);
professor1.atribuirNota(aluno2, disciplina2, 10);
professor1.atribuirNota(aluno2, disciplina3, 10);

professor1.atribuirNota(aluno3, disciplina1, 10);
professor1.atribuirNota(aluno3, disciplina2, 10);
