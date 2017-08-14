const lighthouse = require('lighthouse')
const chromeLauncher = require('lighthouse/chrome-launcher')
const pageSecurityConfig = require('./config')

async function run(url, flags = {}) {
    const config = Object.assign({ extends: 'lighthouse:default' }, pageSecurityConfig)
    const chrome = await chromeLauncher.launch()
    flags.port = chrome.port
    const results = await lighthouse(url, flags, config)
    const stopped = await chrome.kill()

    return results
}

module.exports = run
