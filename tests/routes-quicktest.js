'use strict';

const routes = require('./../api/routes');
const app = require('./../api/server');
const request = require('supertest');

describe('Routes sanity test', () => {

	Object.keys(routes).forEach(r => {
		const _spl = r.split(' ', 2);
		it('respond with json', done => {
			request(app)[_spl[0]](_spl[1])
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, done);
		});
	});

});