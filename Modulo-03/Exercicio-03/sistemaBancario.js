// Cenário:

// Desenvolva um sistema bancário simples que contenha as classes Conta e Cliente. A classe Conta deve ter métodos para depósito, saque e consulta de saldo. A classe Cliente deve ter atributos como nome, idade, e um array de contas.

// Requisitos:

// - Utilize encapsulamento para proteger o saldo da conta.
// - Implemente herança para criar diferentes tipos de contas, como ContaCorrente e ContaPoupanca.
// - Garanta que o saque não seja permitido caso ultrapasse o limite da conta corrente.

class Cliente {
  #contas = [];
  constructor(nome, idade) {
    if (!nome || !idade) throw new Error("Nome e idade são obrigatórios");
    this.nome = nome;
    this.idade = idade;
  }

  inserirConta(conta) {
    this.#contas.push(conta);
  }

  getContas() {
    return this.#contas;
  }
}

class Conta {
  #saldo;
  constructor(dadosCliente, saldoInicial) {
    if (!(dadosCliente instanceof Cliente))
      throw new Error("Dados do cliente inválidos");

    if (!dadosCliente || saldoInicial === undefined)
      throw new Error("Nome e saldo inicial são obrigatórios");

    if (typeof saldoInicial !== "number")
      throw new Error("Saldo inicial deve ser um número");

    if (saldoInicial < 0)
      throw new Error("Saldo inicial deve ser maior ou igual a zero");

    this.#saldo = saldoInicial;
  }

  getSaldo() {
    return this.#saldo;
  }

  depositar(valor) {
    if (valor <= 0)
      throw new Error("Valor de depósito deve ser maior que zero");
    this.#saldo += valor;
  }

  sacar(valor) {
    if (valor > this.#saldo) throw new Error("Saldo insuficiente para saque");
    this.#saldo -= valor;
  }
}

class ContaCorrente extends Conta {
  #limite = 0;

  constructor(dadosCliente, saldoInicial, limite) {
    super(dadosCliente, saldoInicial);

    if (limite === undefined)
      throw new Error("Limite da conta corrente é obrigatório");

    if (typeof limite !== "number")
      throw new Error("Limite da conta corrente deve ser um número");

    if (limite < 0)
      throw new Error(
        "Limite da conta corrente deve ser maior ou igual a zero"
      );

    this.#limite = limite;
    dadosCliente.inserirConta(this);
  }

  sacar(valor) {
    if (valor <= this.getSaldo() + this.#limite) {
      super.sacar(valor);
    } else {
      throw new Error("Limite da conta corrente ultrapassado");
    }
  }

  mostrarLimite() {
    return this.#limite;
  }
}

class ContaPoupanca extends Conta {
  constructor(dadosCliente, saldoInicial) {
    super(dadosCliente, saldoInicial);
    dadosCliente.inserirConta(this);
  }
}

const cliente1 = new Cliente("João", 25);
const contaCorrente = new ContaCorrente(cliente1, 100, 1000);
const contaPoupanca = new ContaPoupanca(cliente1, 100);
console.log(cliente1);

contaCorrente.depositar(100);
contaPoupanca.depositar(1050);
console.log(contaPoupanca.getSaldo());

console.log(cliente1.getContas());
