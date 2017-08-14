/**
 * @license Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';
const path = require('path');
const dirs = {
    lighthouse: require.resolve('lighthouse'),
    audits: path.join(__dirname, '..', 'audits'),
    gatherers: path.join(__dirname, '..', 'gather'),
}

module.exports = {
  // 1. Run your custom tests along with all the default Lighthouse tests.
  extends: 'lighthouse:default',

  // 2. Add gatherer to the default Lighthouse load ('pass') of the page.
  passes: [{
    passName: 'defaultPass',
    gatherers: [
      'csp-meta',
      'meta-generator',
      'redirect',
      'request-headers',
    ].map(basename => path.join(dirs.gatherers, basename)),
  }],

  // 3. Add custom audit to the list of audits 'lighthouse:default' will run.
  audits: [
     ...[
        'csp',
        'csp-meta',
        'xss-protection-header',
        'cookie-httponly',
        'cookie-secure',
        'redirect',
        'meta-generator',
    ].map(basename => path.join(dirs.audits, basename)),
    './audits/is-on-https',
    './audits/dobetterweb/external-anchors-use-rel-noopener',
    './audits/dobetterweb/no-websql'
  ],

  // 4. Create a new 'My site metrics' section in the default report for our results.
  categories: {
    pageSecurity: {
      name: 'Page Security',
      description: 'Scores for some of the best practices for web-security',
      audits: [
        // When we add more custom audits, `weight` controls how they're averaged together.
        {id: 'csp-audit', weight: 1},
        {id: 'xss-headers-audit', weight: 1},
        {id: 'cookie-httpOnly-audit', weight: 1},
        {id: 'cookie-secure-audit', weight: 1},
        {id: 'http-redirect-audit', weight: 1},
        {id: 'is-on-https', weight: 1},
        {id: 'meta-generator', weight: 1},
        {id: 'external-anchors-use-rel-noopener', weight: 0},
        {id: 'no-websql', weight: 0},
      ]
    }
  }
};
