'use strict';
const path = require('path');
const dirs = {
    audits: path.join(__dirname, 'audits'),
    gatherers: path.join(__dirname, 'gather'),
    lighthouseAudits: path.join(path.dirname(require.resolve('lighthouse')), 'audits'),
};
const prefixDir = (dirname) => (basename) => path.join(dirname, basename);

module.exports = {
  // Add gatherer to the default Lighthouse load ('pass') of the page.
  passes: [{
    passName: 'defaultPass',
    gatherers: [
      'request-headers',
      'csp-meta',
      'redirect'
    ].map(prefixDir(dirs.gatherers)),
  }],

  // Add custom audit to the list of audits 'lighthouse:default' will run.
  audits: [
     ...[
        'csp',
        'csp-meta',
        'xss-protection-header',
        'cookie-httponly',
        'cookie-secure',
        'redirect',
    ].map(prefixDir(dirs.audits)),
    ...[
      'is-on-https',
      'dobetterweb/external-anchors-use-rel-noopener',
    ].map(prefixDir(dirs.lighthouseAudits))
  ],

  // Create a new 'Page Security' section in the default report for our results.
  categories: {
    pageSecurity: {
      name: 'Page Security',
      description: 'Scores for some of the best practices for web security',
      audits: [
        // When we add more custom audits, `weight` controls how they're averaged together.
        {id: 'csp-audit', weight: 1},
        {id: 'xss-headers-audit', weight: 1},
        {id: 'cookie-httpOnly-audit', weight: 1},
        {id: 'cookie-secure-audit', weight: 1},
        {id: 'http-redirect-audit', weight: 1},
        {id: 'is-on-https', weight: 1},
        {id: 'external-anchors-use-rel-noopener', weight: 0}
      ]
    }
  }
};
