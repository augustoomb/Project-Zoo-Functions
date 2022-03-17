const data = require('../data/zoo_data');

function contarAnimaisPorEspecie(esp) {
  const especieSolicitada = Object.values(esp)[0];
  const buscarEspecie = (especie) => especie.name === especieSolicitada;
  const especieBuscada = data.species.find(buscarEspecie);

  if (especieBuscada) {
    return especieBuscada.residents.length;
  }
  return 0;
}

function contarAnimaisPorEspecieESexo(esp) {
  const especieSolicitada = Object.values(esp)[0];
  const sexoSolicitado = Object.values(esp)[1];
  const buscarEspecie = (especie) => especie.name === especieSolicitada;
  const especieBuscada = data.species.find(buscarEspecie);
  if (especieBuscada) {
    const residentesDaEspecie = especieBuscada.residents;
    const calcularResidentesDoSexo = (acum, atual) => {
      let acumulado = acum;
      if (atual.sex === sexoSolicitado) {
        acumulado += 1;
      }
      return acumulado;
    };
    return residentesDaEspecie.reduce(calcularResidentesDoSexo, 0);
  }
  return 0;
}

const converterParaObj = (acum, atual) => {
  const acumulado = acum;
  const chave = Object.keys(atual)[0];
  const valor = Object.values(atual)[0];
  acumulado[chave] = valor;
  return acumulado;
};

const calcularAnimaisPorEspecie = (especie) => ({
  [especie.name]: especie.residents.length,
});

function countAnimals(specie) {
  if (specie !== undefined && Object.values(specie).length === 2) {
    return contarAnimaisPorEspecieESexo(specie);
  }
  if (specie !== undefined && Object.values(specie)[0]) {
    return contarAnimaisPorEspecie(specie);
  }
  const qtdAnimaisPorEspecie = data.species.map(calcularAnimaisPorEspecie);
  return qtdAnimaisPorEspecie.reduce(converterParaObj, {});
}

module.exports = countAnimals;
