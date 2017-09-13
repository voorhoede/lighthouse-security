'use strict';
const Audit = require('lighthouse').Audit;

class XssAudit extends Audit {
  static get meta() {
    return {
      category: 'Security',
      name: 'xss-headers',
      description: 'X-XSS-Protection header is set',
      failureDescription: 'X-XSS-Protection header is missing',
      helpText: 'The HTTP `X-XSS-Protection` response header stops pages from loading ' +
                'when they detect reflected cross-site scripting (XSS) attacks. ' +
                '[Learn more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection).',
      requiredArtifacts: ['ResponseHeaders']
    };
  }

  static audit(artifacts) {
    const header = artifacts.ResponseHeaders['x-xss-protection'];
    const hasXssHeader = !!header;

    return {
      rawValue: hasXssHeader
    };
  }
}

module.exports = XssAudit;
