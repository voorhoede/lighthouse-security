'use strict';

/* eslint-env mocha */

const Gatherer = require('../../../gather/gatherers/csp-meta');
const assert = require('assert');
let gatherer;

describe('CspMeta gatherer', () => {
  // Reset the Gatherer before each test.
  beforeEach(() => {
    gatherer = new Gatherer();
  });

  xit('fails', () => {
    return gatherer.afterPass({
      driver: {}
    }).then(artifact => {
      assert.ok(typeof artifact === 'string');
    });
  });
});
