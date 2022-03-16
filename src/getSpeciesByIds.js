const data = require('../data/zoo_data');

function getSpeciesByIds(id1, id2) {
  const filtrarEspecies = (especie) => especie.id === id1 || especie.id === id2;

  return data.species.filter(filtrarEspecies);
}

module.exports = getSpeciesByIds;
