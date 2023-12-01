const avaliacoes = {
  1: 2,
  2: 15,
  3: 18,
  4: 25,
  5: 40,
};

let totalPontos = 0;
let totalClientes = 0;

for (const estrelas in avaliacoes) {
  const quantidadeClientes = avaliacoes[estrelas];
  totalPontos += estrelas * quantidadeClientes;
  totalClientes += quantidadeClientes;
}

const notaMedia = totalPontos / totalClientes;
console.log(`A nota média das avaliações é: ${notaMedia.toFixed(2)}`);
