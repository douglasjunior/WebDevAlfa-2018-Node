// console.log('Olá Mundo!')

// const moment = require('moment');

// const dataAtual = moment();

// const dataFormatada = dataAtual.format('DD/MM/YYYY HH:mm');

// console.log(dataFormatada);

const dateUtils = require('./date-utils');

console.log('Data atual:', dateUtils.getCurrentDate());

console.log('Próximo mês:', dateUtils.getNextMonth());