class Funcionario {
  #nome;
  #salarioBase;
  constructor(nome, salario) {
    if (!nome || !salario) throw new Error("Nome e salário são obrigatórios");
    if (typeof nome !== "string" || typeof salario !== "number")
      throw new Error("Preencha os dados corretamente");

    this.#nome = nome;
    this.#salarioBase = salario;
  }
  get nome() {
    return this.#nome;
  }
  get salario() {
    return this.#salarioBase;
  }
}

class Gerente extends Funcionario {
  #bonificacao;
  #bonus;
  constructor(nome, salarioBase, bonificacao, bonus) {
    if (!bonificacao || !bonus)
      throw new Error("Bonificação e bônus são obrigatórios");
    if (typeof bonificacao !== "number" || typeof bonus !== "number")
      throw new Error("Preencha os dados corretamente");

    super(nome, salarioBase);
    this.#bonificacao = bonificacao;
    this.#bonus = bonus / 100;
  }
  get bonificacao() {
    return this.#bonificacao;
  }
  get bonus() {
    return this.#bonus;
  }
  get salario() {
    const salarioBase = super.salario + this.#bonificacao;
    return salarioBase + salarioBase * this.#bonus;
  }
}

class Programador extends Funcionario {
  #bonus;
  constructor(nome, salarioBase, bonus) {
    super(nome, salarioBase);
    this.#bonus = bonus / 100;
  }
  get bonus() {
    return this.#bonus;
  }
  get salario() {
    let salarioBase = super.salario;
    return salarioBase + salarioBase * this.#bonus;
  }
}

class Departamento {
  #nome;
  #gerente;
  #funcionarios = [];
  constructor(nome, gerente) {
    if (!(gerente instanceof Gerente))
      throw new Error("O gerente deve ser uma instância de Gerente");

    this.#nome = nome;
    this.#gerente = gerente;
  }
  addFuncionario(funcionario) {
    if (funcionario instanceof Gerente)
      throw new Error("Não é possível adicionar um gerente como funcionário");

    if (funcionario instanceof Funcionario) this.funcionarios.push(funcionario);
  }
  removeFuncionario(funcionario) {
    if (funcionario instanceof Funcionario) {
      const index = this.funcionarios.indexOf(funcionario);
      this.funcionarios.splice(index, 1);
    }
  }
  get funcionarios() {
    return this.#funcionarios;
  }
  get nome() {
    return this.#nome;
  }
  get gerente() {
    return this.#gerente;
  }
}

const gerente = new Gerente("João", 5000, 1000, 15);
const departamento = new Departamento("Financeiro", gerente);
const funcionario = new Funcionario("Maria", 1400);
const funcionario2 = new Funcionario("José", 1000);
const programador = new Programador("Pedro", 2000, 10);
departamento.addFuncionario(funcionario);
departamento.addFuncionario(funcionario2);
departamento.addFuncionario(programador);
departamento.removeFuncionario(funcionario2);
console.log(departamento);
