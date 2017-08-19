'use strict';

/* eslint-env mocha */

const Gatherer = require('../../../gather/gatherers/generator-meta');
const assert = require('assert');
let gatherer;

describe('GeneratorMeta gatherer', () => {
  // Reset the Gatherer before each test.
  beforeEach(() => {
    gatherer = new Gatherer();
  });

  it('returns an artifact', () => {
    return gatherer.afterPass({
      driver: {
        querySelector() {
          return Promise.resolve({
            getAttribute: () => 'Wordpress 4.8.1'
          });
        }
      }
    }).then(artifact => {
      assert.ok(typeof artifact === 'string');
      assert.ok(/Wordpress/gim.test(artifact));
    });
  });
});
