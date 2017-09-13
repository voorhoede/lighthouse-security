
'use strict';
const Audit = require('../../audits/manual-ssl-grade');
const assert = require('assert');

/* eslint-env mocha */

// Based on https://github.com/GoogleChrome/lighthouse/blob/c5c6f5/lighthouse-core/test/audits/manual-audit-test.js
describe('Manual SSL Grade', () => {
  it('has manual informative information', () => {
    assert.equal(Audit.meta.requiredArtifacts.length, 0);
    assert.equal(Audit.meta.informative, true);
    assert.equal(Audit.meta.manual, true);
    assert.equal(Audit.meta.hasOwnProperty('name'), true);
    assert.equal(Audit.meta.hasOwnProperty('description'), true);
    assert.equal(Audit.meta.hasOwnProperty('failureDescription'), false);
    assert.equal(Audit.meta.hasOwnProperty('helpText'), true);
  });
});
