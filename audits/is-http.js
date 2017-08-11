/**
 * @license Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const Audit = require('lighthouse').Audit;

const MAX_SEARCHABLE_TIME = 4000;

/**
 * @fileoverview Tests that `window.myLoadMetrics.searchableTime` was below the
 * test threshold value.
 */

class IsHttpsAudit extends Audit {
  static get meta() {
    return {
      category: 'PageSecurity',
      name: 'is-http-audit',
      description: 'Your page is served over',
      helpText: 'To find out more about HTTPS and the benefits of using it for your page(s) visit: https://support.google.com/webmasters/answer/6073543?hl=en',

      // The name of the custom gatherer class that provides input to this audit.
      requiredArtifacts: ['PageProtocol']
    };
  }

  static audit(artifacts) {
    const pageProtocol = artifacts.PageProtocol;

    // Audit will pass when the search box loaded in less time than our threshold.
    // This score will be binary, so will get a red ✘ or green ✓ in the report.
    const isHttps = pageProtocol === 'https:'

    return {
      rawValue: pageProtocol.replace(':', ''),
      score: isHttps
    };
  }
}

module.exports = IsHttpsAudit;
