'use strict';

const lighthouse = require('lighthouse');
const chromeLauncher = require('lighthouse/chrome-launcher');
const pageSecurityConfig = require('./config');

function run(url, flags = {}) {
  const config = flags.security
    ? pageSecurityConfig
    : Object.assign({extends: 'lighthouse:default'}, pageSecurityConfig);

  return chromeLauncher.launch().then(chrome => {
    const resultsPromise = lighthouse(url, Object.assign(flags, {port: chrome.port}), config);
    resultsPromise.then(() => chrome.kill());
    return resultsPromise;
  });
}

module.exports = run;
