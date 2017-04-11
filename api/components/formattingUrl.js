'use strict';

const version = require('./../configs/app').version;
const ver = version.split('.');
const verInt = parseInt(ver[0]);
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: 'FormattingUrl'});
if (verInt <= 0 && isNaN(verInt)) {
  log.warn('Something is bad with version in formattingUrl component');
  throw new Error('Something is bad with version');
}

module.exports = function (prefix, route) {
  const spl = route.split(' ');
  return {
    method: spl[0],
    url: `/${prefix}/v${ver[0]}${spl[1]}`
  }
}