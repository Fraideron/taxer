/**
 * Created by valeriy on 27.03.17.
 */
'use strict';
const storage = require('./../storage');


function getUnpayed(type) {
    let wastes = storage.users[0].data.wastes;
    let wastesByType = [];

    
    for(let waste in wastes) {
        if (wastes[waste].type === type) {
            wastesByType.push(wastes[waste]);
        }
    }
    let unpayedWastes = wastesByType.filter(isUnpayed);
    unpayedWastes.sort(compareDateSorting);
    return unpayedWastes;
}

function compareDateSorting(wast1, wast2) {
    return wast2.date < wast1.date;
}

function isUnpayed (waste) {
    if(waste.rate !== undefined){
        return false;
    } else {
        return true;
    }
}

function calcTotalWaste(wastesChain) {
    let totalUnpayedWasteValue = 0;
    for(let waste in wastesChain){
        let prev = 0;
        if (waste > 1){
            prev++
        }
        let diff = wastesChain[waste].value - wastesChain[prev].value;
        totalUnpayedWasteValue += diff;
    }
    return totalUnpayedWasteValue;
}

function getWastesDiff(waste1, waste2) {
    return (waste2.value - waste1.value);
}

function scatterPayment(wastes, pymnt) {
    let number = 0;
    let rezPayments = [];
    wastes.forEach(function (element, index, array){
        let prev = 0;
        if(index > 1){prev++};
        let differ = getWastesDiff(wastes[prev], wastes[index]);
        let percnt = differ/calcTotalWaste(getUnpayed('gas'));
        rezPayments.push({
            number: number++,
            waste: element,
            diff: differ,
            percent: percnt,
            payment: percnt * pymnt
        })
    });
    rezPayments.shift();
    return rezPayments;
}

module.exports = { getUnpayed, calcTotalWaste, scatterPayment };

//console.log(scatterPayment(getUnpayed('gas'), calcTotalWaste(getUnpayed('gas'))));