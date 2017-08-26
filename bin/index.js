#! /usr/bin/env node
'use strict';

const runLighthouse = require('../index');
const log = require('lighthouse-logger');
const {getFlags} = require('lighthouse/lighthouse-cli/cli-flags');
const {saveResults} = require('lighthouse/lighthouse-cli/run');

const flags = getFlags();
const url = flags._[0];

runLighthouse(url, flags)
  .then(results => saveResults(results, {}, flags))
  .then(() => log.log('CLI', 'Report has been saved successfully!'));
