// atividade 3
class ContadorDePalavras {
  constructor(frase) {
    if (typeof frase !== "string")
      throw new Error("O parametro frase deve ser uma string");
    this.frase = frase;
  }

  contarPalavras() {
    const contagem = this.frase.split(" ").length;
    console.log(`A frase "${this.frase}" tem ${contagem} palavras`);
  }
}

const frase = new ContadorDePalavras("Vem ser tech");
frase.contarPalavras();

const frase2 = new ContadorDePalavras(
  "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
);
frase2.contarPalavras();
