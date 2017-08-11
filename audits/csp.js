const Audit = require('lighthouse').Audit;

const MAX_SEARCHABLE_TIME = 4000;


class CspAudit extends Audit {
  static get meta() {
    return {
      category: 'PageSecurity',
      name: 'csp-audit',
      description: 'CSP meta tag or CSP header is set',
      helpText: 'For more information visit https://developers.google.com/web/fundamentals/security/csp/',

      // The name of the custom gatherer class that provides input to this audit.
      requiredArtifacts: ['CspMetaGatherer', 'RequestHeaders']
    };
  }

  static audit(artifacts) {
    const cspMetaTags = artifacts.CspMetaGatherer
    const headers = artifacts.RequestHeaders

    const hasCspMetaTags = cspMetaTags.length > 0

    const cspHeader = headers['content-security-policy']
    const xCspHeader = headers['x-content-security-policy']
    const hasCspHeader = !!(cspHeader || xCspHeader)

    const csp = hasCspMetaTags || hasCspHeader

    return {
      rawValue: csp.toString(),
      score: csp
    };
  }
}

module.exports = CspAudit;
