'use strict';
const path = require('path');
const lighthouseDir = path.dirname(require.resolve('lighthouse'));
const dirs = {
  audits: path.join(__dirname, 'audits'),
  gatherers: path.join(__dirname, 'gather', 'gatherers'),
  lighthouseAudits: path.join(lighthouseDir, 'audits'),
  lighthouseGatherers: path.join(lighthouseDir, 'gather', 'gatherers'),
};
const addDirFiles = (dirname, basenames) => basenames.map(basename => path.join(dirname, basename));

module.exports = {
  // Add gatherer to the default Lighthouse load ('pass') of the page.
  passes: [{
    passName: 'defaultPass',
    gatherers: [
      ...addDirFiles(dirs.gatherers, [
        'csp-meta',
        'generator-meta',
        'redirect',
        'request-headers',
      ]),
      ...addDirFiles(dirs.lighthouseGatherers, [
        'dobetterweb/anchors-with-no-rel-noopener',
        'dobetterweb/password-inputs-with-prevented-paste',
      ])
    ]
  }],

  // Add custom audit to the list of audits 'lighthouse:default' will run.
  audits: [
    ...addDirFiles(dirs.audits, [
      'csp',
      'csp-meta',
      'cookie-httponly',
      'cookie-secure',
      'generator-meta',
      'redirect',
      'server-header',
      'x-frame-options-header',
      'x-generator-header',
      'xss-protection-header',
    ]),
    ...addDirFiles(dirs.lighthouseAudits, [
      'dobetterweb/external-anchors-use-rel-noopener',
      'dobetterweb/password-inputs-can-be-pasted-into',
      'is-on-https',
    ])
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
        {id: 'external-anchors-use-rel-noopener', weight: 0},
        {id: 'server-header', weight: 1},
        {id: 'x-generator-header', weight: 1},
        {id: 'generator-meta', weight: 1},
        {id: 'x-frame-options-header', weight: 1},
        {id: 'password-inputs-can-be-pasted-into', weight: 1}
      ]
    }
  }
};
