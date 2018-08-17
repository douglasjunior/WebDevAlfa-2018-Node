const moment = require('moment');

function getCurrentDate() {
    const date = moment();
    return date.format('DD/MM/YYYY HH:mm');
}

function getNextMonth() {
    const date = moment();
    return date.add(1, 'month').format('MMMM');
}

const dateUtils = {
    getCurrentDate,
    getNextMonth
};

module.exports = dateUtils;
