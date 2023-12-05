// atividade 2

class ConversorDeMoeda {
  #taxaCambio;
  constructor(cotacao) {
    if (!cotacao) throw new Error("Informe a cotação");
    if (typeof cotacao !== "number") throw new Error("Informe um número");
    if (cotacao <= 0) throw new Error("Informe um valor maior que zero");
    this.#taxaCambio = cotacao;
  }

  converter(valor, moedaOrigem, moedaDestino) {
    if (!valor || !moedaOrigem || !moedaDestino)
      throw new Error("Dados incompletos");

    if (valor <= 0) throw new Error("Informe um valor maior que zero");

    if (typeof valor !== "number") throw new Error("Informe um número");

    if (typeof moedaOrigem !== "string" || typeof moedaDestino !== "string")
      throw new Error("Informe uma moeda válida");
    if (!valor) throw new Error("Informe um valor");

    return `${moedaOrigem} ${valor} equivale a ${moedaDestino} ${
      valor * this.#taxaCambio
    }`;
  }
}

const conversor = new ConversorDeMoeda(5.5);
// const conversor = new ConversorDeMoeda(-5.5); Valor menor que zero
console.log(conversor.converter(5, "BRL", "USD"));
console.log(conversor.converter(10, "USD", "BRL"));
// console.log(conversor.converter(-5, "USD", "BRL")); Valor menor que zero
