// const data = require('../data/zoo_data');

// const especies = data.species;

// function checarSeStringEAnimal(str) {
//     const buscarEspecies = (especie) => especie.name === str;

//     const arrObjEspecies = data.species.filter(buscarEspecies);

//     return arrObjEspecies.length > 0 ? true : false;
// }

// function checarSeStringEDia(str) {
//     const diasDaSemana = Object.keys(data.hours);

//     return diasDaSemana.includes(str);
// }

// function atualizarObjDia(objDia, arrNomesEspecies) {
//     if (arrNomesEspecies.length === 0) {
//         return {
//             ['officeHour']: 'CLOSED',
//             ['exhibition']: 'The zoo will be closed!'
//         }
//     }

//     return {
//         ['officeHour']: `Open from ${objDia.open+""}am until ${objDia.close+""}pm`,
//         ['exhibition']: arrNomesEspecies,
//     }
// }

// function buscarEspecPorDia(diaDaSemana) {

//     // filtra os objetos 'especie' que tem o dia da semana passado
//     const filtrarEspecies = (esp) => esp.availability.includes(diaDaSemana);

//     const arrEspeciesFilt = especies.filter(filtrarEspecies);

//     // para cada obj espécie encontrado, quero pegar só o nome. No fim tenho o arr de todos os nomes
//     const pegarNomes = (especie) => especie.name;

//     const arrNomesEspecies = arrEspeciesFilt.map(pegarNomes);

//     return arrNomesEspecies;
// }

// function construiObjTodosOsDias() {
//     const objGeral = data.hours;

//     Object.keys(objGeral).forEach((key) => {
//         let cadaDia = objGeral[key];

//         // key aqui vale o dia da semana
//         const arrNomesEspecies = buscarEspecPorDia(key);

//         const novoDia = atualizarObjDia(cadaDia, arrNomesEspecies);

//         objGeral[key] = novoDia;
//     })

//     return objGeral;
// }

// function contruirUmDia(strDia) {
//     const objTodosOsDias = data.hours;

//     let objDia = {};
//     Object.keys(objTodosOsDias).forEach((key) => {
//         if(key === strDia) {
//             objDia = objTodosOsDias[key]
//         }

//     })
//     const arrNomesEspecies = buscarEspecPorDia(strDia);
//     const novoDia = {
//         [strDia]: atualizarObjDia(objDia, arrNomesEspecies)
//     };
//     return novoDia;
// }

// function buscarDiasPorEspecie(strEspecie) {
//     const buscarEspec = (especie) => especie.name === strEspecie;

//     const especieProcu = especies.find(buscarEspec);

//     const arrDiasDisp = especieProcu.availability;
//     return arrDiasDisp;
// }

// function getSchedule(scheduleTarget) {
//     if(scheduleTarget !== undefined && checarSeStringEDia(scheduleTarget)) {
//         return contruirUmDia(scheduleTarget);
//     }

//     if(scheduleTarget !== undefined && checarSeStringEAnimal(scheduleTarget)) {
//         return buscarDiasPorEspecie(scheduleTarget);
//     }

//     return construiObjTodosOsDias();
// }

// //getSchedule();

// module.exports = getSchedule;

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

function montarOfficeHourF(dia) {
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
  Friday: { officeHour: montarOfficeHourF('Friday'), exhibition: buscarNomesAnimais('Friday'),
  },
  Saturday: {
    officeHour: montarOfficeHourF('Saturday'), exhibition: buscarNomesAnimais('Saturday'),
  },
  Sunday: {
    officeHour: montarOfficeHourF('Sunday'), exhibition: buscarNomesAnimais('Sunday'),
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
