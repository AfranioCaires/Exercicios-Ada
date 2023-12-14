class Carro {
  constructor(modelo, placa, disponibilidade) {
    if (!modelo || !placa || disponibilidade === undefined)
      throw new Error("Todos os campos são obrigatórios.");

    if (typeof modelo !== "string" || typeof placa !== "string")
      throw new Error("Os campos modelo e placa devem ser do tipo string.");

    modelo = modelo.trim().toLowerCase();
    placa = placa.trim().toUpperCase();

    if (!["basico", "básico", "luxo", "esportivo"].includes(modelo))
      throw new Error("O campo modelo deve ser válido.");

    if (typeof disponibilidade !== "boolean")
      throw new Error("O campo disponibilidade deve ser do tipo boolean.");

    this.modelo = modelo;
    this.placa = placa;
    this.disponibilidade = disponibilidade;
  }
  static toString() {
    return `${this.modelo} - ${this.placa} - ${this.disponibilidade} - ${this.valorDiaria}`;
  }

  get valorDiaria() {
    switch (this.modelo) {
      case "basico":
      case "básico":
        return 100;
      case "luxo":
        return 200;
      case "esportivo":
        return 300;
    }
  }
}

class Cliente {
  #carrosAlugados = [];
  constructor(nome, cpf) {
    this.nome = nome;
    this.cpf = cpf;
  }

  get carrosAlugados() {
    return this.#carrosAlugados;
  }

  alugarCarro(carro, dataInicio, dataFim) {
    if (!(carro instanceof Carro))
      throw new Error("O objeto fornecido não é uma instância de Carro.");

    if (!(dataInicio instanceof Date) || !(dataFim instanceof Date))
      throw new Error("Os campos dataInicio e dataFim devem ser do tipo Date.");

    if (!carro.disponibilidade)
      throw new Error("O carro fornecido não está disponível.");

    const locacao = new Locacao(this, carro, dataInicio, dataFim);
    this.#carrosAlugados.push(locacao);
    carro.disponibilidade = false;
    return locacao;
  }
}

class Locacao {
  constructor(cliente, carro, dataInicio, dataFim) {
    if (!(cliente instanceof Cliente))
      throw new Error("O objeto fornecido não é uma instância de Cliente.");

    if (!(carro instanceof Carro))
      throw new Error("O objeto fornecido não é uma instância de Carro.");

    if (!(dataInicio instanceof Date) || !(dataFim instanceof Date))
      throw new Error("Os campos dataInicio e dataFim devem ser do tipo Date.");

    if (dataInicio > dataFim)
      throw new Error("A data de início deve ser anterior à data de fim.");

    this.cliente = cliente;
    this.carro = carro;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
  }

  get valorTotal() {
    const dias = Math.ceil(
      (this.dataFim.getTime() - this.dataInicio.getTime()) / 86400000
    );
    return dias * this.carro.valorDiaria;
  }
}

class AgenciaLocadora {
  #carros = [];
  constructor(nome) {
    this.nome = nome;
  }

  get carros() {
    return this.#carros;
  }

  adicionarCarro(carro) {
    if (!(carro instanceof Carro))
      throw new Error("O objeto fornecido não é uma instância de Carro.");

    this.#carros.push(carro);
  }

  buscarCarro(placa) {
    if (typeof placa !== "string")
      throw new Error("O campo placa deve ser do tipo string.");

    placa = placa.trim().toUpperCase();

    return this.#carros.find((carro) => carro.placa === placa);
  }

  buscarCarrosDisponiveis() {
    return this.#carros.filter((carro) => carro.disponibilidade);
  }
}

const agencia = new AgenciaLocadora("Locadora de Carros");
const carro1 = new Carro("basico", "ABC-1234", true);
const carro2 = new Carro("luxo", "DEF-5678", true);
const carro3 = new Carro("esportivo", "GHI-9012", false);
agencia.adicionarCarro(carro1);
agencia.adicionarCarro(carro2);
agencia.adicionarCarro(carro3);
const cliente = new Cliente("João", "123.456.789-10");
const locacao = cliente.alugarCarro(
  carro1,
  new Date("2023-05-01"),
  new Date("2023-05-10")
);
console.log(locacao.valorTotal);
console.log(agencia.buscarCarrosDisponiveis());
console.log(agencia.buscarCarro("ABC-1234"));
console.log(agencia.buscarCarro("DEF-5678"));
console.log(agencia.buscarCarro("GHI-9012"));
