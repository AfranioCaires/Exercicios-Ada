class Aluno {
  constructor(nome, idade, matricula) {
    if (typeof nome !== "string" || nome.trim() === "") {
      throw new Error("O nome do aluno deve ser uma string não vazia.");
    }
    if (typeof idade !== "number" || idade < 0) {
      throw new Error("A idade do aluno deve ser um número positivo.");
    }
    if (typeof matricula !== "string" || matricula.trim() === "") {
      throw new Error("A matrícula do aluno deve ser uma string não vazia.");
    }
    this.nome = nome;
    this.idade = idade;
    this.matricula = matricula;
  }
}

class Disciplina {
  constructor(nome) {
    if (typeof nome !== "string" || nome.trim() === "") {
      throw new Error("O nome da disciplina deve ser uma string não vazia.");
    }
    this.nome = nome;
    this.notas = [];
  }

  adicionarNota(nota) {
    if (!(nota instanceof Nota))
      throw new Error("A nota deve ser uma instância da classe Nota.");
    this.notas.push(nota);
  }

  calcularMedia() {
    if (this.notas.length === 0) {
      return 0;
    }

    const somaNotas = this.notas.reduce((total, nota) => total + nota.valor, 0);
    return somaNotas / this.notas.length;
  }
}

class Nota {
  constructor(valor) {
    if (typeof valor !== "number" || valor < 0 || valor > 10) {
      throw new Error("O valor da nota deve ser um número entre 0 e 10.");
    }
    this.valor = valor;
  }
}

class Boletim {
  constructor(aluno) {
    if (!(aluno instanceof Aluno)) {
      throw new Error("O aluno deve ser uma instância da classe Aluno.");
    }
    this.aluno = aluno;
    this.disciplinas = [];
  }

  adicionarDisciplina(disciplina) {
    if (!(disciplina instanceof Disciplina)) {
      throw new Error(
        "A disciplina deve ser uma instância da classe Disciplina."
      );
    }
    this.disciplinas.push(disciplina);
  }

  consultarDesempenho() {
    console.log(`Boletim do Aluno: ${this.aluno.nome}`);
    console.log("Disciplinas:");

    this.disciplinas.forEach((disciplina) => {
      const media = disciplina.calcularMedia();
      console.log(`${disciplina.nome}: Média ${media}`);
    });
  }
}

const aluno1 = new Aluno("João", 16, "12345");
const disciplina1 = new Disciplina("Matemática");
const disciplina2 = new Disciplina("Português");

const nota1 = new Nota(8);
const nota2 = new Nota(7);
const nota3 = new Nota(9);

disciplina1.adicionarNota(nota1);
disciplina1.adicionarNota(nota2);
disciplina2.adicionarNota(nota3);

const boletim = new Boletim(aluno1);
boletim.adicionarDisciplina(disciplina1);
boletim.adicionarDisciplina(disciplina2);

boletim.consultarDesempenho();
