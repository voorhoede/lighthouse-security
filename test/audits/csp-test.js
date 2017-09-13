'use strict';

const Audit = require('../../audits/csp.js');
const assert = require('assert');

/* eslint-env mocha */

describe('Security: CSP audit', () => {
  it('fails if no CSP headers and CSP meta tag is present', () => {
    return assert.equal(Audit.audit({
      CspMetaGatherer: [],
      ResponseHeaders: {
        'content-security-policy': null,
        'x-content-security-policy': null
      }
    }).rawValue, false);
  });

  it('passes if CSP meta tag is present', () => {
    return assert.equal(Audit.audit({
      CspMetaGatherer: [
        'default-src https:',
      ],
      ResponseHeaders: {
        'content-security-policy': null,
        'x-content-security-policy': null
      }
    }).rawValue, true);
  });

  it('passes if Content-Security-Policy header is set', () => {
    return assert.equal(Audit.audit({
      CspMetaGatherer: [],
      ResponseHeaders: {
        'content-security-policy': 'default-src https:',
        'x-content-security-policy': null
      }
    }).rawValue, true);
  });

  it('passes if X-Content-Security-Policy header is set', () => {
    return assert.equal(Audit.audit({
      CspMetaGatherer: [],
      ResponseHeaders: {
        'content-security-policy': null,
        'x-content-security-policy': 'default-src https:'
      }
    }).rawValue, true);
  });
});
