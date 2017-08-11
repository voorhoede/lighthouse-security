# Lighthouse Security

**Runs the default Google Lighthouse tests with additional security tests.**
<img width="100%" alt="Lighthouse Security metrics" src="docs/metrics.png">
<img width="100%" alt="Lighthouse Security audits" src="docs/audits.png">
## Installation

```sh
npm install -g lighthouse-security
```

## Run from CLI
Run the command from CLI like displayed below. The options are the same as for
the [default lighthouse implementation](https://github.com/GoogleChrome/lighthouse).

```sh
lighthouse-security <url> [options]
```

## Use in code

The extension can also be used within your code. A short example is given below.
To render reports etc. it is recommended to import functionality from lighthouse.

```javascript
const lighthouse-security = require('lighthouse-security')

lighthouse-security(url, flags, config).then( results => ...)
```
