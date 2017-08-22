'use strict';

const Audit = require('lighthouse').Audit;

class CspMetaAudit extends Audit {
  static get meta() {
    return {
      category: 'PageSecurity',
      name: 'csp-meta-audit',
      description: 'CSP meta tag is set',
      helpText: 'For more information visit https://developers.google.com/web/fundamentals/security/csp/',
      requiredArtifacts: ['CspMetaGatherer']
    };
  }

  static audit(artifacts) {
    const cspMetaTags = artifacts.CspMetaGatherer;
    const hasCspMetaTags = cspMetaTags.length > 0;

    return {
      rawValue: hasCspMetaTags,
      score: hasCspMetaTags
    };
  }
}

module.exports = CspMetaAudit;
