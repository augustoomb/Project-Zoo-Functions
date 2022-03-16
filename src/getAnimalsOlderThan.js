const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  const filtrarEspecie = (especie) => especie.name === animal;

  const arrDeAnimaisDaEspecieBuscada = data.species.find(filtrarEspecie).residents;

  const testarSeAnimaisTemIdadeMinima = (animalTestado) => animalTestado.age > age;

  return arrDeAnimaisDaEspecieBuscada.every(testarSeAnimaisTemIdadeMinima);
}

module.exports = getAnimalsOlderThan;
