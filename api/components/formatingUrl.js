/**
 * Created by valeriy on 26.03.17.
 */
'use strict';
const version = require('./../configs/app').version;
const ver = version.split('.');
const verInt = parseInt(ver[0]);
if(verInt <= 0 && isNaN(verInt)){
    throw new Error('Something is bad with version');
}

module.exports =  function (prefix, route) {
    const spl = route.split(' ');
    return {
        method: spl[0],
        url: `${prefix}/v${ver[0]}${spl[1]}`
    }
}