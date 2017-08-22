'use strict';

const Audit = require('lighthouse').Audit;

class HttpRedirectAudit extends Audit {
  static get meta() {
    return {
      category: 'PageSecurity',
      name: 'http-redirect-audit',
      description: 'HTTP redirect to HTTPS',
      helpText: 'For more information visit https://developers.google.com/web/fundamentals/security/csp/',
      requiredArtifacts: ['HttpRedirect']
    };
  }

  static audit(artifacts) {
    const redirectResponse = artifacts.HttpRedirect;

    const isRedirect = redirectResponse.statusCode >= 300 && redirectResponse.statusCode < 400;

    return {
      rawValue: isRedirect,
      score: isRedirect
    };
  }
}

module.exports = HttpRedirectAudit;
