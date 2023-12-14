class Paciente {
  #historicoMedico = new HistoricoMedico(this);
  constructor(nome, idade, endereco) {
    if (!nome || !idade || !endereco)
      throw new Error("Preencha todos os campos");
    if (typeof nome !== "string" || typeof endereco !== "string")
      throw new Error("Nome e endereço devem ser do tipo string");
    if (typeof idade !== "number")
      throw new Error("Idade deve ser do tipo number");
    if (idade < 0) throw new Error("Idade deve ser maior que zero");
    nome = nome.trim();
    endereco = endereco.trim();
    if (nome.length < 3 || endereco.length < 10)
      throw new Error("Nome e endereço inválidos");
    this.nome = nome;
    this.idade = idade;
    this.endereco = endereco;
  }
  getHistoricoMedico() {
    return this.#historicoMedico;
  }
  mostrarHistorico() {
    this.#historicoMedico.consultarHistorico().forEach((consulta) => {
      console.log(consulta.toString());
    });
  }
}

class Medico {
  constructor(nome, especialidade) {
    if (!nome || !especialidade) throw new Error("Preencha todos os campos");
    if (typeof nome !== "string" || typeof especialidade !== "string")
      throw new Error("Nome e especialidade devem ser do tipo string");
    nome = nome.trim();
    especialidade = especialidade.trim();
    if (nome.length < 3 || especialidade.length < 5)
      throw new Error("Nome e especialidade inválidos");
    this.nome = nome;
    this.especialidade = especialidade;
  }
}

class Consulta {
  constructor(data, hora, paciente, medico, diagnostico) {
    if (!data || !hora || !paciente || !medico || !diagnostico)
      throw new Error("Preencha todos os campos");
    if (!(paciente instanceof Paciente))
      throw new Error("Paciente deve ser do tipo Paciente");
    if (!(medico instanceof Medico))
      throw new Error("Médico deve ser do tipo Médico");
    if (typeof diagnostico !== "string")
      throw new Error("Diagnóstico deve ser do tipo string");
    if (diagnostico.length < 20)
      throw new Error("Diagnóstico deve ter no mínimo 20 caracteres");
    if (!(data instanceof Date)) throw new Error("Data deve ser do tipo Date");
    if (/^[0-9]{2}:[0-9]{2}$/.test(hora) === false)
      throw new Error("Hora deve estar no formato HH:mm");

    this.data = data.toLocaleDateString("pt-BR");
    this.hora = hora;
    this.medico = medico;
    this.diagnostico = diagnostico;
    this.paciente = paciente;
  }
  toString() {
    return `Consulta em ${this.data} às ${this.hora}. Médico responsável: ${this.medico.nome}. Diagnóstico: ${this.diagnostico}`;
  }
}

class HistoricoMedico {
  #consultas = [];
  #paciente;

  constructor(paciente) {
    this.#paciente = paciente;
  }

  adicionarConsulta(consulta) {
    if (!(consulta instanceof Consulta))
      throw new Error("Consulta deve ser do tipo Consulta");
    if (consulta.paciente !== this.#paciente)
      throw new Error(
        "O paciente da consulta deve ser o mesmo do histórico médico"
      );
    if (this.#consultas.includes(consulta))
      throw new Error("Consulta já existente");
    this.#consultas.push(consulta);
  }

  consultarHistorico() {
    return this.#consultas;
  }
}
const paciente = new Paciente("João", 25, "Rua dos bobos, 0");
const paciente2 = new Paciente("Maria", 30, "Rua dos bobos, 0");
const medico = new Medico("Dr. House", "Clínico Geral");
const consulta = new Consulta(
  new Date("2023-12-05"),
  "10:00",
  paciente,
  medico,
  "Dor de cabeça e febre. Receitado repouso e paracetamol"
);
const consulta2 = new Consulta(
  new Date("2023-12-05"),
  "10:00",
  paciente2,
  medico,
  "Dor de cabeça e febre. Suspeita de dengue. Receitado repouso."
);
paciente.getHistoricoMedico().adicionarConsulta(consulta);
paciente2.getHistoricoMedico().adicionarConsulta(consulta2);
console.log(paciente.getHistoricoMedico().consultarHistorico());
console.log(consulta.toString());
