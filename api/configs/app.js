'use strict';

// environment resolvation
module.exports = {
	// dev/prod/test
	name: 'taxer',
	environment: 'test',
	port: 3333,
	apiPrefix: 'api',
	version: require('./../../package.json').version
};
