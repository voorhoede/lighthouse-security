'use strict';

const Audit = require('../../audits/x-generator-header.js');
const assert = require('assert');

/* eslint-env mocha */

describe('Security: X-Generator header audit', () => {
  xit('fails', () => {
    return assert.equal(Audit.audit({
      // set artifact values
    }).rawValue, true);
  });
});
