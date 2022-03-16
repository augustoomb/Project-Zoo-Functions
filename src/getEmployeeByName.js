const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  const buscarPessoa = (pessoa) => pessoa.firstName === employeeName
  || pessoa.lastName === employeeName;

  const pessoaEncontrada = data.employees.find(buscarPessoa);

  return pessoaEncontrada !== undefined ? pessoaEncontrada : {};
}

module.exports = getEmployeeByName;
