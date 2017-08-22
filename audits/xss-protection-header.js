'use strict';

const Audit = require('lighthouse').Audit;


class XssAudit extends Audit {
  static get meta() {
    return {
      category: 'PageSecurity',
      name: 'xss-headers-audit',
      description: 'X-XSS-Protection header is set',
      helpText: 'For more information visit https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection',
      requiredArtifacts: ['RequestHeaders']
    };
  }

  static audit(artifacts) {
    const headers = artifacts.RequestHeaders;
    const xssHeader = headers['x-xss-protection'];
    const hasXssHeader = !!xssHeader;

    return {
      rawValue: hasXssHeader,
      score: hasXssHeader
    };
  }
}

module.exports = XssAudit;
