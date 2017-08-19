# [Lighthouse](https://github.com/GoogleChrome/lighthouse) Security [![Linux Build Status](https://travis-ci.org/voorhoede/lighthouse-security.svg?branch=master)](https://travis-ci.org/voorhoede/lighthouse-security) [![npm lighthouse-security package](https://img.shields.io/npm/v/lighthouse-security.svg)](https://npmjs.org/package/lighthouse-security)

**Runs the default Google Lighthouse tests with additional security tests.**

<img width="100%" alt="Lighthouse Security metrics" src="docs/metrics.png">
<img width="100%" alt="Lighthouse Security audits" src="docs/audits.png">

## Installation

```sh
npm install -g lighthouse-security
```

## Run from CLI

Run the command from CLI like displayed below. The options are the same as for
the [default Lighthouse CLI options](https://github.com/GoogleChrome/lighthouse#cli-options).

```sh
lighthouse-security <url> [options]
```

To run security audits only, use the `--security` flag:

```sh
lighthouse-security <url> --security [options]
```

## Use in code

The extension can also be used within your code. A short example is given below.
To render reports etc. it is recommended to import functionality from Lighthouse.

```javascript
const runLighthouse = require('lighthouse-security')

runLighthouse(url, flags)
  .then(results => console.log(results))
```

Alternatively you can import just the `lighthouse-security` configuration and use it in your own runner:

```javascript
const lighthouse = require('lighthouse')
const chromeLauncher = require('lighthouse/chrome-launcher')

// import one or more lighthouse configs:
const securityConfig = require('lighthouse-security/config')

// combine configs into one:
const config = Object.assign({},
  pageSecurityConfig,
  { extends: 'lighthouse:default' }
)

// run lighthouse as usual:
async function run(url, flags = {}) {
    const chrome = await chromeLauncher.launch()
    flags.port = chrome.port
    const results = await lighthouse(url, flags, config)
    const stopped = await chrome.kill()
    return results
}
```
