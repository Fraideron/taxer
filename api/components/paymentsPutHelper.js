'use strict';

const bunyan = require('bunyan');
const log = bunyan.createLogger({name: 'PaymentHelper'});

const getAllWastes = type =>
    storage.users[0].data.wastes;

const compareDateSorting = (wast1, wast2) =>
    wast2.date < wast1.date;

const checkWasteType = (type, waste) =>
    waste.type === type; 

const isUnpayed = waste =>
    waste.rate === undefined;

const getWastesDiff = (waste2, waste1) =>
    waste2.value - waste1.value;

const getUnpayed = type => {
    log.info('Select unpayed wastes in paymentPutHelper component');
    const _typeFilter = checkWasteType.bind(null, type);
    return getAllWastes()
        .filter(_typeFilter)
        .filter(isUnpayed)
        .sort(compareDateSorting);
}

const calcTotalWaste = wastesChain => {   
    log.info('Calculate total wastes values different in paymentPutHelper component');
    return wastesChain.reduce((acc, element, index, array) => {
        if (!index)
            return 0;
        return acc + getWastesDiff(element, array[index-1]);
    });
}

function scatterPayment(wastes, payment) {
    log.info('Scatter payment in paymentPutHelper component');
    const res = [];
    const totalWaste = calcTotalWaste(wastes);
    wastes.forEach(function (waste, index, array) {
        if (!index) return;
        const diff = getWastesDiff(waste, array[index-1]);
        const percent = diff / totalWaste;
        res.push({
            number: index,
            waste: waste,
            diff: differ,
            percent: percent,
            payment: percent * payment
        })
    });
    return res;
}

module.exports = { getUnpayed, calcTotalWaste, scatterPayment };

//console.log(scatterPayment(getUnpayed('gas'), calcTotalWaste(getUnpayed('gas'))));