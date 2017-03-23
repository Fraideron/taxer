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
    return require(path);
};

// -------------------------------------------------------------------- handlers list
module.exports = {
    productRoutes: {
        'get /wastes': handler('wastes').GET,
        'get /wastes/:type': handler('wastes').getByType,
        'put /wastes': handler('wastes').put,
        'post /wastes/:n': handler('wastes').post,
        'delete /wastes/:id': handler('wastes').delete,
        'get /taxes': handler('taxes').GET,
        'put /taxes': handler('taxes').put,
        'post /taxes/:type': handler('taxes').post,
        'delete /taxes/:type': handler('taxes').delete,
        'get /payments': handler('payments').GET,
        'get /payments/:type': handler('payments').getByType,
        'put /payments/:type': handler('payments').put
    },

    testRoutes:{
        'get /wastes': handler('wastes').GET,
        'get /wastes/:type': handler('wastes').getByType,
        'put /wastes': handler('wastes').put,
        'post /wastes/:n': handler('wastes').post,
        'delete /wastes/:id': handler('wastes').delete,
        'get /taxes': handler('taxes').GET,
        'put /taxes': handler('taxes').put,
        'post /taxes/:type': handler('taxes').post,
        'delete /taxes/:type': handler('taxes').delete,
        'get /payments': handler('payments').GET,
        'get /payments/:type': handler('payments').getByType,
        'put /payments/:type': handler('payments').put

    }
};

