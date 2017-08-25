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
        'request-headers',
      ]),
      ...addDirFiles(dirs.lighthouseGatherers, [
        'dobetterweb/anchors-with-no-rel-noopener',
        'dobetterweb/password-inputs-with-prevented-paste',
        'http-redirect',
        'url',
      ])
    ]
  }],

  // Add custom audit to the list of audits 'lighthouse:default' will run.
  audits: [
    ...addDirFiles(dirs.audits, [
      'csp',
      'cookie-httponly',
      'cookie-secure',
      'cookie-samesite',
      'generator-meta',
      'server-header',
      'strict-transport-security',
      'x-frame-options-header',
      'x-generator-header',
      'xss-protection-header',
    ]),
    ...addDirFiles(dirs.lighthouseAudits, [
      'dobetterweb/external-anchors-use-rel-noopener',
      'dobetterweb/password-inputs-can-be-pasted-into',
      'is-on-https',
      'redirects-http',
    ])
  ],

  groups: {
    'secure-connection': {
      title: 'Secure connection',
      description: ''
    },
    'secure-cookies': {
      title: 'Secure cookies',
      description: ''
    },
    'secure-content': {
      title: 'Secure content',
      description: ''
    },
    'secure-ux': {
      title: 'Secure UX',
      description: ''
    },
    'fingerprinting': {
      title: 'Fingerprinting',
      description: ''
    },
  },

  // Add custom sections to the default report.
  categories: {
    security: {
      name: 'Security',
      description: 'Scores for some of the best practices for web security',
      audits: [
        // When we add more custom audits, `weight` controls how they're averaged together.
        {group: 'secure-connection', id: 'is-on-https', weight: 1},
        {group: 'secure-connection', id: 'redirects-http', weight: 1},
        {group: 'secure-connection', id: 'strict-transport-security', weight: 1},
        {group: 'secure-cookies', id: 'cookie-secure', weight: 1},
        {group: 'secure-cookies', id: 'cookie-httponly', weight: 1},
        {group: 'secure-cookies', id: 'cookie-samesite', weight: 1},
        {group: 'secure-content', id: 'csp', weight: 1},
        {group: 'secure-content', id: 'xss-headers', weight: 1},
        {group: 'secure-ux', id: 'x-frame-options-header', weight: 1},
        {group: 'secure-ux', id: 'external-anchors-use-rel-noopener', weight: 1},
        {group: 'secure-ux', id: 'password-inputs-can-be-pasted-into', weight: 1},
        {group: 'fingerprinting', id: 'server-header', weight: 0},
        {group: 'fingerprinting', id: 'x-generator-header', weight: 0},
        {group: 'fingerprinting', id: 'generator-meta', weight: 0},
      ]
    }
  }
};
