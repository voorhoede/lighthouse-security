'use strict';

/* eslint-env mocha */

const Gatherer = require('../../../gather/gatherers/redirect');
const assert = require('assert');
let gatherer;

describe('Redirect gatherer', () => {
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
