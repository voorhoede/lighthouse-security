'use strict';

const Audit = require('../../audits/redirect.js');
const assert = require('assert');

/* eslint-env mocha */

describe('Security: Redirect audit', () => {
  xit('fails', () => {
    return assert.equal(Audit.audit({
      // set artifact values
    }).rawValue, true);
  });
});
