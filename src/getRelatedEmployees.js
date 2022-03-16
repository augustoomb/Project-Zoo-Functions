const data = require('../data/zoo_data');

function isManager(id) {
  const testarSeEhGerente = (funcionario) => {
    const testarInterno = (idManager) => idManager === id;
    return funcionario.managers.some(testarInterno);
  };
  return data.employees.some(testarSeEhGerente);
}

function getRelatedEmployees(managerId) {
  if (!isManager(managerId)) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }

  const filtrarFuncionarios = (funcionario) => {
    const testar = (nomeGerente) => nomeGerente === managerId;

    return funcionario.managers.some(testar);
  };
  const arrObjFuncionariosQueTemEsseGerente = data.employees.filter(filtrarFuncionarios);

  const buscarPornomeESobrenome = (funcionario) =>
    `${funcionario.firstName} ${funcionario.lastName}`;

  const nomeSobrenomeDosFuncionariosSelecionados = arrObjFuncionariosQueTemEsseGerente
    .map(buscarPornomeESobrenome);

  return nomeSobrenomeDosFuncionariosSelecionados;
}

// console.log(getRelatedEmployees('9e7d4524-363c-416a-8759-8aa7e50c0992'));

module.exports = { isManager, getRelatedEmployees };
