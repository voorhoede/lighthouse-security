'use strict';

const Audit = require('../../audits/csp.js');
const assert = require('assert');

/* eslint-env mocha */

describe('Security: CSP audit', () => {
  xit('fails', () => {
    return assert.equal(Audit.audit({
      // set artifact values
    }).rawValue, true);
  });
});
