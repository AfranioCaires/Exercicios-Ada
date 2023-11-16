let peso = prompt("Digite o seu peso(kg)");
let altura = prompt("Digite a sua altura(m):");

peso = parseFloat(peso);
altura = parseFloat(altura);

if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
  alert("Por favor, insira valores válidos.");
} else {
  let imc = peso / (altura * altura);
  let resultado = "Seu IMC é: " + imc.toFixed(2) + "\n";

  switch (imc) {
    case imc < 18.5:
      resultado += "Abaixo do peso";
      break;
    case imc >= 18.5 && imc < 24.9:
      resultado += "Peso normal";
      break;
    case imc >= 25 && imc < 29.9:
      resultado += "Sobrepeso";
      break;
    default:
      resultado += "Obesidade";
  }

  alert(resultado);
}
