'use strict';

const Audit = require('lighthouse').Audit;

class MetaGeneratorAudit extends Audit {
  static get meta() {
    return {
      category: 'PageSecurity',
      name: 'meta-generator',
      description: 'Page has no `<meta name="generator">`',
      failureDescription: 'Page has `<meta name="generator">` set to',
      helpText: 'Make sure to remove the generator meta tag to prevent ' +
          'web framework fingerprinting. The tag exposes known vulnerabilities ' +
          'in unpatched versions as well as specific misconfigurations in the ' +
          'framework and known file structures. ' +
          '[Learn more](https://goo.gl/67tR4s).',
      requiredArtifacts: ['MetaGenerator']
    };
  }

  static audit(artifacts) {
    const generatorValue = artifacts.MetaGenerator;
    const hasNoGenerator = (typeof generatorValue !== 'string');

    if (hasNoGenerator) {
        return { 
            rawValue: true 
        };
    }
    
    return {
      displayValue: generatorValue,
      rawValue: hasNoGenerator
    };
  }
}

module.exports = MetaGeneratorAudit;