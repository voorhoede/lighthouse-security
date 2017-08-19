'use strict';

const Audit = require('lighthouse').Audit;

class XgeneratorHeaderAudit extends Audit {
  static get meta() {
    return {
      category: 'PageSecurity',
      name: 'x-generator-header',
      description: 'Page has no `X-Generator` header',
      failureDescription: 'Page has `X-Generator` header set to',
      helpText: 'Make sure to remove the X-Generator header to prevent ' +
          'web framework fingerprinting. The header exposes known vulnerabilities ' +
          'in unpatched versions as well as specific misconfigurations in the ' +
          'framework and known file structures. ' +
          '[Learn more](https://goo.gl/XhsuhC).',
      requiredArtifacts: ['RequestHeaders']
    };
  }

  static audit(artifacts) {
    const headers = artifacts.RequestHeaders;
    const headerValue = headers['x-generator'];
    const hasNoGenerator = (typeof headerValue !== 'string');

    if (hasNoGenerator) {
      return {
        rawValue: true
      };
    }

    return {
      displayValue: headerValue,
      rawValue: hasNoGenerator
    };
  }
}

module.exports = XgeneratorHeaderAudit;
