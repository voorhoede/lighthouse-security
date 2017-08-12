#! /usr/bin/env node

const runLighthouse = require('../index')
const { getFlags } = require('lighthouse/lighthouse-cli/cli-flags')
const { saveResults } = require('lighthouse/lighthouse-cli/run')

const flags = getFlags()
const url = flags._[0]

runLighthouse(url, flags)
    .then(results => saveResults(results, {}, flags))
    .then(res => console.log('Report has been saved successfully!'))
