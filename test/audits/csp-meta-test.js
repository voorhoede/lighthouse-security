'use strict';

const Audit = require('../../audits/csp-meta.js');
const assert = require('assert');

/* eslint-env mocha */

describe('Security: CSP Meta audit', () => {
  xit('fails', () => {
    return assert.equal(Audit.audit({
      // set artifact values
    }).rawValue, true);
  });
});
