'use strict';

const config = require('./../api/configs/app');
config.environment = 'test';

const _routes = require('./../api/routes');
const app = require('./../api/server');
const request = require('supertest');
const assert = require('assert');

// reducing all routes into a flat list
let routes = {};
for (let r in _routes)
	routes = Object.assign(routes, _routes[r]);

describe('Routes validity', () => {

	const routeValidationRegexp = /(get|post|put|delete|all) \/.*/i;
	Object.keys(routes).forEach(r => {
		it(r, done => {
			assert(routeValidationRegexp.test(r));
			done();
		});
	});	

});

describe('Routes sanity test', () => {

	Object.keys(routes).forEach(r => {
		const _spl = r.split(' ', 2);
    const route = _spl[1].replace(/:(.*?)(\/|$)/, '1$2');
    it(`'${_spl[0]} ${route}' respond with json`, done => {
			request(app)[_spl[0]](`/api/v1.0.0`+route)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, done);
		});
	});

});