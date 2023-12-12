class Hotel {
  #quartos = [];
  constructor(nome) {
    if (!nome) throw new Error("Nome do hotel não informado");
    if (typeof nome !== "string") throw new Error("Nome do hotel inválido");
    nome = nome.trim();
    if (nome.length < 2) throw new Error("Nome do hotel inválido");
    this.nome = nome;
  }

  adicionarQuarto(quarto) {
    this.#quartos.push(quarto);
  }

  exibirInformacoes() {
    console.log(`Hotel: ${this.nome}`);
    console.log("Quartos:");
    this.#quartos.forEach((quarto) => {
      quarto.exibirInformacoes();
    });
  }
}

class Quarto {
  constructor(numero, tipo) {
    if (!numero || !tipo)
      throw new Error("Número e tipo do quarto não informados");
    if (typeof numero !== "number" || typeof tipo !== "string")
      throw new Error("Número e tipo do quarto inválidos");

    numero = parseInt(numero);
    tipo = tipo.trim();

    if (isNaN(numero) || numero < 1)
      throw new Error("Número do quarto inválido");

    if (tipo.length < 2) throw new Error("Tipo do quarto inválido");

    this.numero = numero;
    this.tipo = tipo;
    this.disponivel = true;
  }

  exibirInformacoes() {
    console.log(`Quarto ${this.numero}: Tipo ${this.tipo}`);
    console.log(`Disponível: ${this.disponivel ? "Sim" : "Não"}`);
  }
}

class Hospede {
  constructor(nome, email) {
    if (!nome || !email)
      throw new Error("Nome e e-mail do hóspede não informados");
    if (typeof nome !== "string" || typeof email !== "string")
      throw new Error("Nome e e-mail do hóspede inválidos");

    nome = nome.trim();
    email = email.trim();

    if (nome.length < 2) throw new Error("Nome do hóspede inválido");

    if (!(email.includes("@") && email.includes(".")))
      throw new Error("E-mail do hóspede inválido");

    this.nome = nome;
    this.email = email;
  }
}

class Reserva {
  constructor(hospede, quarto, dataInicio, dataFim) {
    if (!hospede || !quarto || !dataInicio || !dataFim)
      throw new Error("Dados da reserva não informados");
    if (
      !(hospede instanceof Hospede) ||
      !(quarto instanceof Quarto) ||
      !(dataInicio instanceof Date) ||
      !(dataFim instanceof Date)
    )
      throw new Error("Dados da reserva inválidos");

    if (dataInicio > dataFim)
      throw new Error("Data de início não pode ser maior que a data de fim");

    if (!quarto.disponivel)
      throw new Error("Quarto não disponível para reserva");

    this.hospede = hospede;
    this.quarto = quarto;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
    quarto.disponivel = false;
  }
}

// Usage example:
const hotel = new Hotel("Hotel Orientado a objetos");

const quarto1 = new Quarto(101, "Simples");
const quarto2 = new Quarto(201, "Duplo");
const quarto3 = new Quarto(301, "Suíte");

hotel.adicionarQuarto(quarto1);
hotel.adicionarQuarto(quarto2);
hotel.adicionarQuarto(quarto3);

const hospede1 = new Hospede("João Objeto", "joaoobjeto@objeto.com");
const reserva1 = new Reserva(
  hospede1,
  quarto1,
  new Date("2023-01-01"),
  new Date("2023-01-01")
);

quarto1.disponivel = false;

const reserva2 = new Reserva(
  hospede1,
  quarto2,
  new Date("2023-01-01"),
  new Date("2023-01-01")
);

hotel.exibirInformacoes();
