class SalaConferencia {
  constructor(nome, capacidade) {
    if (!nome || !capacidade)
      throw new Error("Nome e capacidade são obrigatórios");
    if (typeof capacidade !== "number")
      throw new Error("Capacidade deve ser um número");
    if (capacidade < 1 || capacidade > 99)
      throw new Error("Capacidade deve ser entre 1 e 99");
    if (nome.trim().length < 1 || nome.trim().length > 20)
      throw new Error("Nome deve ter entre 1 e 20 caracteres");

    this.nome = nome.trim();
    this.capacidade = capacidade;
    this.reservas = [];
    this.calendario = new Calendario();
  }

  adicionarReserva(reserva) {
    this.reservas.push(reserva);
    this.calendario.adicionarReserva(reserva);
  }

  cancelarReserva(reserva) {
    if (!(reserva instanceof Reserva)) throw new Error("Reserva inválida");
    const index = this.reservas.indexOf(reserva);
    if (index === -1) throw new Error("Reserva não encontrada");
    this.reservas.splice(index, 1);
  }

  verificarDisponibilidade(dataInicio, dataFim) {
    for (const reserva of this.reservas) {
      if (!(dataInicio instanceof Date) || !(dataFim instanceof Date))
        throw new Error("Data inválida");
      if (
        (dataInicio >= reserva.dataInicio && dataInicio <= reserva.dataFim) ||
        (dataFim >= reserva.dataInicio && dataFim <= reserva.dataFim)
      ) {
        return false;
      }
    }
    return true;
  }
}

class Reserva {
  constructor(sala, usuario, dataInicio, dataFim) {
    if (!(sala instanceof SalaConferencia)) throw new Error("Sala inválida");
    if (!(usuario instanceof Usuario)) throw new Error("Usuário inválido");
    if (!(dataInicio instanceof Date) || !(dataFim instanceof Date))
      throw new Error("Data inválida");
    if (dataInicio >= dataFim)
      throw new Error("Data de início deve ser anterior à data de fim");

    this.sala = sala;
    this.usuario = usuario;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
  }

  toString() {
    return `${this.usuario.nome} reservou a sala ${
      this.sala.nome
    } de ${this.dataInicio.toLocaleDateString(
      "pt-BR"
    )} até ${this.dataFim.toLocaleDateString("pt-BR")} para ${
      this.dataFim.getDate() - this.dataInicio.getDate()
    } dias.`;
  }
}

class Usuario {
  constructor(nome) {
    if (!nome) throw new Error("Nome é obrigatório");
    if (typeof nome !== "string") throw new Error("Nome deve ser uma string");
    if (nome.trim().length < 1 || nome.trim().length > 20)
      throw new Error("Nome deve ter entre 1 e 20 caracteres");
    this.nome = nome.trim();
  }

  fazerReserva(sala, dataInicio, dataFim) {
    if (sala.verificarDisponibilidade(dataInicio, dataFim)) {
      const reserva = new Reserva(sala, this, dataInicio, dataFim);
      sala.adicionarReserva(reserva);
      return reserva;
    }
    throw new Error("A sala já está reservada nesse horário.");
  }
}

class Calendario {
  constructor() {
    this.reservas = [];
  }

  adicionarReserva(reserva) {
    if (!(reserva instanceof Reserva)) throw new Error("Reserva inválida");
    this.reservas.push(reserva);
  }
  mostrarCalendario() {
    console.log(this.reservas);
  }
}

const sala = new SalaConferencia("Sala 01", 10);
const usuario = new Usuario("João");
const reserva = usuario.fazerReserva(
  sala,
  new Date("2021-01-10"),
  new Date("2021-01-13")
);

sala.cancelarReserva(reserva);

console.log(reserva.toString());
const reserva1 = usuario.fazerReserva(
  sala,
  new Date("2021-01-10"),
  new Date("2021-01-13")
);
