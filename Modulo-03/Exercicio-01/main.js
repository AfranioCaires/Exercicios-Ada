// exercicio 1
// Objetivo: Criar uma função que recebe uma lista de números e retorna a soma dos quadrados dos números pares.

const arrTeste = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// 4 + 16 + 36 + 64 = 120;

function somaQuadradosPares(array) {
  const arrPares = array.filter((numero) => numero % 2 === 0);
  const arrQuadrado = arrPares.map((numero) => numero * numero);
  return arrQuadrado.reduce((contador, numero) => contador + numero);
}

console.log(somaQuadradosPares(arrTeste));
// 120

// exercicio 2
// Objetivo: Criar uma função que recebe uma lista de palavras e retorna uma nova lista com as palavras ordenadas por tamanho, da menor para a maior.

const arrTeste2 = [
  "laranja",
  "abacaxi",
  "banana",
  "uva",
  "melancia",
  "mamao",
  "morango",
];

function ordenaPorTamanho(array) {
  return array.sort((a, b) => a.length - b.length);
}

console.log(ordenaPorTamanho(arrTeste2));
// ["uva", "laranja", "banana", "abacaxi", "mamao", "morango", "melancia"]

// exercicio 3

// Objetivo: Criar uma função que recebe uma lista de números e retorna a média dos números ímpares.

const arrTeste3 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function mediaImpares(array) {
  const arrayImpar = array.filter((numero) => numero % 2 == 1);
  const somaArray = arrayImpar.reduce((contador, numero) => contador + numero);
  return somaArray / arrayImpar.length;
}

console.log(mediaImpares(arrTeste3));

//  -------------------
// POO

// exercicio 1
// Objetivo: Criar uma classe Pessoa com propriedades como nome, idade e cidade, e métodos para calcular a idade em anos bissextos.

// exercicio 2
// objetivo: Criar uma hierarquia de classes para representar animais, com classes específicas para mamíferos e aves.

class Animal {
  constructor(nome, tipo) {
    this.nome = nome;
    this.tipo = tipo;
  }
}

class Mamifero extends Animal {
  amamentar() {
    return "Amamentando";
  }
}

class Ave extends Animal {
  voar() {
    return "Voando";
  }
}

const cachorro = new Mamifero("Cachorro", "Mamifero");
const gato = new Mamifero("Gato", "Mamifero");
const papagaio = new Ave("Papagaio", "Ave");
const arara = new Ave("Arara", "Ave");

console.log(cachorro.amamentar());
console.log(gato.amamentar());
console.log(papagaio.voar());
console.log(arara.voar());

// exercicio 3
// Objetivo: Implementar uma classe Carro com métodos para ligar, desligar, acelerar e frear.

class Carro {
  constructor(modelo, ano, ligado) {
    this.modelo = modelo;
    this.ano = ano;
    this.ligado = ligado;
  }

  ligar() {
    this.ligado = true;
    return "Ligado";
  }

  desligar() {
    this.ligado = false;
    return "Desligado";
  }

  acelerar() {
    return "Acelerando";
  }

  frear() {
    return "Freando";
  }

  status() {
    return `O carro está ${this.ligado ? "ligado" : "desligado"}`;
  }
}

const carro = new Carro("Fusca", 1970, false);
console.log(carro.status());

const carro2 = new Carro("Ferrari", 2021, true);
console.log(carro2.status());
