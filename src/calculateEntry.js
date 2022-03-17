const data = require('../data/zoo_data');

function countEntrants(entrants) {
  const converter = (acum, atual) => {
    const acumulado = acum;
    if (atual.age < 18) {
      acumulado.child += 1;
    } else if (atual.age >= 18 && atual.age < 50) {
      acumulado.adult += 1;
    } else {
      acumulado.senior += 1;
    }
    return acumulado;
  };

  return entrants.reduce(converter, { child: 0, adult: 0, senior: 0 });
}

// criança: 20.99
// adulto:  49.99
// idosa:   24.99

const calcularEntrada = (idade) => {
  if (idade < 18) {
    return 20.99;
  }
  if (idade >= 18 && idade < 50) {
    return 49.99;
  }
  return 24.99;
};

function calculateEntry(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) { // testa se objeto está vazio
    return 0;
  }
  const calcular = (acum, atual) => {
    let valorEntrada = 0;
    let acumulado = acum;

    valorEntrada = calcularEntrada(atual.age);

    acumulado += valorEntrada;

    return acumulado;
  };

  const valorTotal = entrants.reduce(calcular, 0);

  return parseFloat(valorTotal.toFixed(2));
}

module.exports = { calculateEntry, countEntrants };
