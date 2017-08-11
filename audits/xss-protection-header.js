const Audit = require('lighthouse').Audit;

const MAX_SEARCHABLE_TIME = 4000;


class XssAudit extends Audit {
  static get meta() {
    return {
      category: 'PageSecurity',
      name: 'xss-headers-audit',
      description: 'X-XSS-Protection header is set',
      helpText: 'For more information visit https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection',

      // The name of the custom gatherer class that provides input to this audit.
      requiredArtifacts: ['RequestHeaders']
    };
  }

  static audit(artifacts) {
    const headers = artifacts.RequestHeaders;

    const xss_header = headers['x-xss-protection']

    const hasCspHeader = !!xss_header

    return {
      rawValue: hasCspHeader.toString(),
      score: hasCspHeader
    };
  }
}

module.exports = XssAudit;
