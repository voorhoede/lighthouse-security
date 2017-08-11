const lighthouse = require('lighthouse');
const chromeLauncher = require('lighthouse/chrome-launcher');

async function run(url, flags = {}, config = null) {
    const chrome = await chromeLauncher.launch()
    flags.port = chrome.port
    const results = await lighthouse(url, flags, config)
    const stopped = await chrome.kill()

    return results
    //
    // return chromeLauncher.launch()
    //     .then(chrome => {
    //         flags.port = chrome.port;
    //         return lighthouse(url, flags, config)
    //             .then(results => chrome.kill().then(() => results));
    //     });
}

module.exports = run
