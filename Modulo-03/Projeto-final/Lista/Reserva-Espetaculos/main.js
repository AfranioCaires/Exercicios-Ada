class Espetaculo {
  constructor(titulo, data, horario, assentosDisponiveis) {
    if (!titulo || !data || !horario || !assentosDisponiveis)
      throw new Error("Preencha todos os campos");
    if (assentosDisponiveis <= 0)
      throw new Error(
        "A quantidade de assentos disponíveis deve ser maior que 0"
      );
    if (typeof titulo !== "string")
      throw new Error("O título deve ser uma string");
    titulo = titulo.trim();
    if (titulo.length < 3)
      throw new Error("O título deve ter no mínimo 3 caracteres");
    if (!(data instanceof Date))
      throw new Error("A data deve ser um objeto Date");
    if (typeof horario !== "string")
      throw new Error("O horário deve ser uma string");
    if (!/^\d{2}:\d{2}$/.test(horario))
      throw new Error("O horário deve estar no formato HH:mm");

    this.titulo = titulo;
    this.data = data.toLocaleDateString("pt-BR");
    this.horario = horario;
    this.assentosDisponiveis = assentosDisponiveis;
    this.assentosReservados = [];
  }

  exibirInformacoes() {
    console.log(
      `Espetáculo: ${this.titulo} - Data: ${this.data} - Horário: ${this.horario} - Assentos Disponíveis: ${this.assentosDisponiveis}`
    );
  }
}

class Cliente {
  constructor(nome) {
    if (!nome) throw new Error("O nome deve ser preenchido");
    if (typeof nome !== "string") throw new Error("O nome deve ser uma string");
    nome = nome.trim();
    if (nome.length < 3)
      throw new Error("O nome deve ter no mínimo 3 caracteres");
    this.nome = nome;
  }

  exibirInformacoes() {
    console.log(`Cliente: ${this.nome}`);
  }
}

class Reserva {
  constructor(espetaculo, cliente, assento) {
    if (!espetaculo || !cliente || !assento)
      throw new Error("Preencha todos os campos");
    if (!(espetaculo instanceof Espetaculo))
      throw new Error("O espetáculo deve ser um objeto Espetaculo");
    if (!(cliente instanceof Cliente))
      throw new Error("O cliente deve ser um objeto Cliente");
    if (typeof assento !== "string")
      throw new Error("O assento deve ser uma string");
    assento = assento.trim().toUpperCase();
    if (!/^[A-Z]\d{1,2}$/.test(assento))
      throw new Error("O assento deve estar no formato A1, A2, ..., Z99");

    if (espetaculo.assentosDisponiveis <= 0)
      throw new Error("Não há assentos disponíveis para este espetáculo");

    if (espetaculo.assentosReservados.includes(assento))
      throw new Error("Este assento já está reservado");

    espetaculo.assentosReservados.push(assento);
    espetaculo.assentosDisponiveis--;

    this.espetaculo = espetaculo;
    this.cliente = cliente;
    this.assento = assento;
  }

  exibirInformacoes() {
    console.log(
      `Espetáculo: ${this.espetaculo.titulo} - Cliente: ${this.cliente.nome} - Assento: ${this.assento}`
    );
  }
}

class Teatro {
  constructor() {
    this.espetaculos = [];
  }

  adicionarEspetaculo(espetaculo) {
    if (!(espetaculo instanceof Espetaculo))
      throw new Error("O espetáculo deve ser um objeto Espetaculo");

    this.espetaculos.push(espetaculo);
  }

  exibirInformacoes() {
    console.log("Espetáculos Agendados:");
    this.espetaculos.forEach((espetaculo) => {
      console.log(`- ${espetaculo.titulo}`);
    });
  }
}

const teatro = new Teatro();

const espetaculo1 = new Espetaculo(
  "O Fantasma da Ópera",
  new Date("2023-01-01"),
  "20:00",
  100
);
const espetaculo2 = new Espetaculo(
  "Les Misérables",
  new Date("2023-01-01"),
  "19:30",
  150
);

teatro.adicionarEspetaculo(espetaculo1);
teatro.adicionarEspetaculo(espetaculo2);

const cliente1 = new Cliente("John Doe");
const cliente2 = new Cliente("Jane Smith");

const reserva1 = new Reserva(espetaculo1, cliente1, "A1");
const reserva2 = new Reserva(espetaculo2, cliente2, "B2");

espetaculo1.exibirInformacoes();
cliente1.exibirInformacoes();
reserva1.exibirInformacoes();

teatro.exibirInformacoes();
