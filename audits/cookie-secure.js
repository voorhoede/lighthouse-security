'use strict';

const Audit = require('lighthouse').Audit;

class SecureCookiesAudit extends Audit {
  static get meta() {
    return {
      category: 'PageSecurity',
      name: 'cookie-secure-audit',
      description: 'Secure cookies used',
      helpText: 'For more information visit https://www.owasp.org/index.php/SecureFlag',

      // The name of the custom gatherer class that provides input to this audit.
      requiredArtifacts: ['RequestHeaders']
    };
  }

  static audit(artifacts) {
    const headers = artifacts.RequestHeaders;
    const setCookieHeader = headers['set-cookie'];

    const httpOnly = /secure/.test(setCookieHeader) || !setCookieHeader;

    return {
      rawValue: httpOnly.toString(),
      score: httpOnly
    };
  }
}

module.exports = SecureCookiesAudit;
