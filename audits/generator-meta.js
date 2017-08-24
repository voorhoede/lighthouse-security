'use strict';
const Audit = require('lighthouse').Audit;

class MetaGeneratorAudit extends Audit {
  static get meta() {
    return {
      category: 'Security',
      name: 'generator-meta',
      description: 'Page has no `<meta name="generator">`',
      failureDescription: 'Page has `<meta name="generator">` set to',
      helpText: 'Make sure to remove the generator meta tag to prevent ' +
          'web framework fingerprinting. The tag exposes known vulnerabilities ' +
          'in unpatched versions as well as specific misconfigurations in the ' +
          'framework and known file structures. ' +
          '[Learn more](https://goo.gl/XhsuhC).',
      requiredArtifacts: ['GeneratorMeta']
    };
  }

  static audit(artifacts) {
    const generatorValue = artifacts.GeneratorMeta;
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
