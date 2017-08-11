const Audit = require('lighthouse').Audit;

const MAX_SEARCHABLE_TIME = 4000;


class CspMetaAudit extends Audit {
  static get meta() {
    return {
      category: 'PageSecurity',
      name: 'csp-meta-audit',
      description: 'CSP meta tag is set',
      helpText: 'For more information visit https://developers.google.com/web/fundamentals/security/csp/',

      // The name of the custom gatherer class that provides input to this audit.
      requiredArtifacts: ['CspMetaGatherer']
    };
  }

  static audit(artifacts) {
    const cspMetaTags = artifacts.CspMetaGatherer;

    const hasCspMetaTags = cspMetaTags.length > 0

    return {
      rawValue: hasCspMetaTags.toString(),
      score: hasCspMetaTags
    };
  }
}

module.exports = CspMetaAudit;
