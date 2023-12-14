class Despesa {
  constructor(valor, data, categoria) {
    if (typeof valor !== "number" || isNaN(valor) || valor <= 0)
      throw new Error("O valor da despesa deve ser um número positivo");

    if (!(data instanceof Date) || isNaN(data.getTime()))
      throw new Error(
        "A data da despesa deve ser uma instância válida de Date"
      );

    if (typeof categoria !== "string" || categoria.trim() === "")
      throw new Error("A categoria da despesa deve ser uma string não vazia");

    this.valor = valor;
    this.data = data;
    this.categoria = categoria;
  }
}

class Receita {
  constructor(valor, data, fonte) {
    if (typeof valor !== "number" || isNaN(valor) || valor <= 0)
      throw new Error("O valor da receita deve ser um número positivo");

    if (!(data instanceof Date) || isNaN(data.getTime()))
      throw new Error(
        "A data da receita deve ser uma instância válida de Date"
      );

    if (typeof fonte !== "string" || fonte.trim() === "")
      throw new Error("A fonte da receita deve ser uma string não vazia");

    this.valor = valor;
    this.data = data;
    this.fonte = fonte;
  }
}

class Categoria {
  constructor(nome) {
    if (typeof nome !== "string" || nome.trim() === "")
      throw new Error("O nome da categoria deve ser uma string não vazia");

    this.nome = nome;
  }
}

class Orcamento {
  #despesas = [];
  #receitas = [];

  registrarDespesa(despesa) {
    if (!(despesa instanceof Despesa))
      throw new Error("A despesa deve ser uma instância válida de Despesa");

    this.#despesas.push(despesa);
  }

  registrarReceita(receita) {
    if (!(receita instanceof Receita))
      throw new Error("A receita deve ser uma instância válida de Receita");

    this.#receitas.push(receita);
  }

  calcularSaldo() {
    const totalDespesas = this.#despesas.reduce(
      (total, despesa) => total + despesa.valor,
      0
    );
    const totalReceitas = this.#receitas.reduce(
      (total, receita) => total + receita.valor,
      0
    );

    return totalReceitas - totalDespesas;
  }

  gerarRelatorio() {
    const saldo = this.calcularSaldo();
    let relatorio = `Saldo: R$ ${saldo.toFixed(2)}\n\nDespesas:\n`;

    for (let despesa of this.#despesas) {
      relatorio += `Valor: R$ ${despesa.valor.toFixed(
        2
      )} | Data: ${despesa.data.toLocaleDateString()} | Categoria: ${
        despesa.categoria
      }\n`;
    }

    relatorio += "\nReceitas:\n";

    for (let receita of this.#receitas) {
      relatorio += `Valor: R$ ${receita.valor.toFixed(
        2
      )} | Data: ${receita.data.toLocaleDateString("pt-BR")} | Fonte: ${
        receita.fonte
      }\n`;
    }

    return relatorio;
  }
}

try {
  const orcamento = new Orcamento();
  const despesa1 = new Despesa(100, new Date("2023-12-1"), "Alimentação");
  const despesa2 = new Despesa(200, new Date("2023-12-10"), "Alimentação");
  const despesa3 = new Despesa(300, new Date("2023-12-20"), "Lazer");

  orcamento.registrarDespesa(despesa1);
  orcamento.registrarDespesa(despesa2);
  orcamento.registrarDespesa(despesa3);

  const receita1 = new Receita(300, new Date("2023-12-5"), "Salário");
  const receita2 = new Receita(400, new Date("2023-12-15"), "Salário");
  const receita3 = new Receita(500, new Date("2023-12-25"), "Jogo do tigrinho");
  orcamento.registrarReceita(receita1);
  orcamento.registrarReceita(receita2);
  orcamento.registrarReceita(receita3);

  console.log(orcamento.gerarRelatorio());
} catch (error) {
  console.error(error.message);
}
