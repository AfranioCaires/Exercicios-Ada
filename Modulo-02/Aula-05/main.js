let peso = prompt("Digite o seu peso (kg)");
let altura = prompt("Digite a sua altura (m):");

peso = parseFloat(peso);
altura = parseFloat(altura);

if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
  alert("Por favor, insira valores válidos.");
} else {
  let imc = peso / (altura * altura);
  let resultado = "Seu IMC é: " + imc.toFixed(2) + "\n";

  if (imc < 18.5) {
    resultado += "Abaixo do peso";
  } else if (imc >= 18.5 && imc < 24.9) {
    resultado += "Peso normal";
  } else if (imc >= 25 && imc < 29.9) {
    resultado += "Sobrepeso";
  } else {
    resultado += "Obesidade";
  }
  alert(resultado);
}
