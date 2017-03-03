'use strict';

/**
 * No real need to create such a complicated structure with modules for such a small project.
 * simply `roures.js` + `handlers` folder inside `api` would be enought.
 * P.S. This structure is nasty and I will not use it even in Evolution, just a failed experiment
 * (remove afret read this)
 * --
 * Karponter
 */

// -------------------------------------------------------------------- handlers importing wrapper
const _routesDir = 'handlers';
// @todo: fraideron, check if you understand what is going on
const handler = name => {
	const path = `./${_routesDir}/${name}`;
	const result = require(path);
	// function MUST return an Array, even if there is only one handler
	if (!(result instanceof Array))
		result = [result];
	return result;
};

// -------------------------------------------------------------------- handlers list
module.exports = {
  'get /wastes': handler('wastes'),
  'get /wastes/:type': handler('wastes'),
  'put /wastes': handler('wastes'),
  'post /wastes/:n': handler('wastes'),
  'delete /wastes/:n': handler('wastes'),
  'get /taxes': handler('taxes'),
  'put /taxes': handler('taxes'),
  'post /taxes/:type': handler('taxes'),
  'delete /taxes/:type': handler('taxes'),
  'get /payments': handler('payments'),
  'get /payments/:type': handler('payments'),
  'put /payments/:type': handler('payments')
};