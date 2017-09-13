'use strict';
const Audit = require('lighthouse').Audit;

class CspAudit extends Audit {
  static get meta() {
    return {
      category: 'Security',
      name: 'csp',
      description: 'Has a Content Security Policy (CSP)',
      failureDescription: 'Is missing Content Security Policy (CSP)',
      helpText: 'A Content Security Policy helps prevent cross-site scripting (XSS), ' +
                'clickjacking and other code injection by whitelisting trusted resources. ' +
                '[Learn more](https://developers.google.com/web/fundamentals/security/csp/)',
      requiredArtifacts: ['CspMetaGatherer', 'ResponseHeaders']
    };
  }

  static audit(artifacts) {
    const cspMetaTags = artifacts.CspMetaGatherer;
    const headers = artifacts.ResponseHeaders;
    const hasCspMetaTags = cspMetaTags.length > 0;
    const cspHeader = headers['content-security-policy'];
    const xCspHeader = headers['x-content-security-policy'];
    const hasCspHeader = !!(cspHeader || xCspHeader);
    const hasCsp = hasCspMetaTags || hasCspHeader;

    return {
      rawValue: hasCsp
    };
  }
}

module.exports = CspAudit;
