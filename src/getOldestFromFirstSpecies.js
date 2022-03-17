const data = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  const buscarEmpregado = (empregado) => empregado.id === id;
  const empregadoInformado = data.employees.find(buscarEmpregado);
  const idAnimalPeloQualEhResponsavel = empregadoInformado.responsibleFor[0];
  const buscarObjAnimal = (animal) => animal.id === idAnimalPeloQualEhResponsavel;
  const objAnimal = data.species.find(buscarObjAnimal);
  const animaisResidentes = objAnimal.residents;
  const buscarAnimalMaisVelho = (maior, atual) => {
    if (atual.age > maior.age) { return atual; } return maior;
  };
  const animalResidenteMaisVelho = animaisResidentes.reduce(buscarAnimalMaisVelho);
  const arrObjAnimalResidenteMaisVelho = [
    Object.entries(animalResidenteMaisVelho)[0][1],
    Object.entries(animalResidenteMaisVelho)[1][1],
    Object.entries(animalResidenteMaisVelho)[2][1],
  ];
  return arrObjAnimalResidenteMaisVelho; // testegithub
}

module.exports = getOldestFromFirstSpecies;
