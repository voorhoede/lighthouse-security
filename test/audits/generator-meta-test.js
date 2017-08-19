'use strict';

const Audit = require('../../audits/generator-meta.js');
const assert = require('assert');

/* eslint-env mocha */

describe('Security: `<meta name="generator">` audit', () => {
  it('fails when HTML contains a generator meta tag', () => {
    return assert.equal(Audit.audit({
      GeneratorMeta: 'Wordpress 4.8.1'
    }).rawValue, false);
  });

  it('fails when HTML contains a generator meta tag', () => {
    return assert.equal(Audit.audit({
      GeneratorMeta: 'Wordpress 4.8.1'
    }).displayValue, 'Wordpress 4.8.1');
  });

  it('passes when no generator meta tag is present', () => {
    return assert.equal(Audit.audit({
      GeneratorMeta: null
    }).rawValue, true);
  });
});
