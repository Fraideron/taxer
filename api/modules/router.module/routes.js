'use strict';

module.exports = {

  'get /wastes': [require('./handlers/wastes')],
  'get /wastes/:type': [require('./handlers/wastes')],
  'put /wastes': [require('./handlers/wastes')],
  'post /wastes/:n': [require('./handlers/wastes')],
  'delete /wastes/:n': [require('./handlers/wastes')],
  'get /taxes': [require('./handlers/taxes')],
  'put /taxes': [require('./handlers/taxes')],
  'post /taxes/:type': [require('./handlers/taxes')],
  'delete /taxes/:type': [require('./handlers/taxes')],
  'get /payments': [require('./handlers/payments')],
  'get /payments/:type': [require('./handlers/payments')],
  'put /payments/:type': [require('./handlers/payments')]
};