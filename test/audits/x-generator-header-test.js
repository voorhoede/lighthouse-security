'use strict';

const Audit = require('../../audits/x-generator-header.js');
const assert = require('assert');

/* eslint-env mocha */

describe('Security: X-Generator header audit', () => {
  it('fails when X-Generator header is present', () => {
    return assert.equal(Audit.audit({
      RequestHeaders: {
        'x-generator': 'Drupal 7 (http://drupal.org)'
      }
    }).rawValue, false);
  });

  it('displays value of the X-Generator header', () => {
    return assert.equal(Audit.audit({
      RequestHeaders: {
        'x-generator': 'Drupal 7 (http://drupal.org)'
      }
    }).displayValue, 'Drupal 7 (http://drupal.org)');
  });

  it('passes when no X-Generator header is present', () => {
    return assert.equal(Audit.audit({
      RequestHeaders: {
        'x-generator': null
      }
    }).rawValue, true);
  });
});
