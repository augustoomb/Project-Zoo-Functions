const data = require('../data/zoo_data');

const weekday = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'];

let objhours = {};

function iniciar() {
  objhours = data.hours;
}

function buscarNomesAnimais(diaDaSemana) {
  const filtrar2 = (especie) => especie.availability.includes(diaDaSemana);

  const arrTeste = data.species.filter(filtrar2);

  const func3 = (especie) => especie.name;

  const novoTeste = arrTeste.map(func3);

  return novoTeste;
}

function buscarAnimal(strAnimal) {
  const arrDeAnimais = data.species;

  const procurarAnimal = (ani) => ani.name === strAnimal;

  const objAnimalProcurado = arrDeAnimais.find(procurarAnimal);

  return objAnimalProcurado;
}

function buscarDiasDaSemanaDoAnimal(objAnimal) {
  return objAnimal.availability;
}

function montarOfficeHour(dia) {
  switch (dia) {
  case 'Tuesday':
    return `Open from ${objhours.Tuesday.open}am until ${objhours.Tuesday.close}pm`;
  case 'Wednesday':
    return `Open from ${objhours.Wednesday.open}am until ${objhours.Wednesday.close}pm`;
  default:
    return `Open from ${objhours.Thursday.open}am until ${objhours.Thursday.close}pm`;
  }
}

function montarOfficeHour2(dia) {
  switch (dia) {
  case 'Friday':
    return `Open from ${objhours.Friday.open}am until ${objhours.Friday.close}pm`;
  case 'Saturday':
    return `Open from ${objhours.Saturday.open}am until ${objhours.Saturday.close}pm`;
  default:
    return `Open from ${objhours.Sunday.open}am until ${objhours.Sunday.close}pm`;
  }
}

function montarObjetos() {
  return { Tuesday: {
    officeHour: montarOfficeHour('Tuesday'), exhibition: buscarNomesAnimais('Tuesday'),
  },
  Wednesday: {
    officeHour: montarOfficeHour('Wednesday'), exhibition: buscarNomesAnimais('Wednesday'),
  },
  Thursday: {
    officeHour: montarOfficeHour('Thursday'), exhibition: buscarNomesAnimais('Thursday'),
  },
  Friday: { officeHour: montarOfficeHour2('Friday'), exhibition: buscarNomesAnimais('Friday'),
  },
  Saturday: {
    officeHour: montarOfficeHour2('Saturday'), exhibition: buscarNomesAnimais('Saturday'),
  },
  Sunday: {
    officeHour: montarOfficeHour2('Sunday'), exhibition: buscarNomesAnimais('Sunday'),
  },
  Monday: { officeHour: 'CLOSED', exhibition: 'The zoo will be closed!' } };
}

function getSchedule(scheduleTarget) {
  iniciar();
  if (scheduleTarget) {
    const objAnimalBuscado = buscarAnimal(scheduleTarget);
    if (objAnimalBuscado) {
      return buscarDiasDaSemanaDoAnimal(objAnimalBuscado);
    }
  }
  if (scheduleTarget === 'Monday') {
    return {
      Monday: { officeHour: 'CLOSED', exhibition: 'The zoo will be closed!' },
    };
  }
  const obj = montarObjetos();
  if (weekday.includes(scheduleTarget)) {
    return { [scheduleTarget]: obj[scheduleTarget] };
  }
  return obj;
}

console.log(getSchedule('lions'));

module.exports = getSchedule;
