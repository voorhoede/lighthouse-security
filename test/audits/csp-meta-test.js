'use strict';

const Audit = require('../../audits/csp-meta.js');
const assert = require('assert');

/* eslint-env mocha */

describe('Security: `<meta name="Content-Security-Policy">` audit', () => {
  it('fails if no CSP meta tags are present', () => {
    return assert.equal(Audit.audit({
      CspMetaGatherer: []
    }).rawValue, false);
  });

  it('passes if a CSP meta tag is present', () => {
    return assert.equal(Audit.audit({
      CspMetaGatherer: [
        'default-src https:',
      ]
    }).rawValue, true);
  });
});
