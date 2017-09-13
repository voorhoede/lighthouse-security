# Contributing

We'd love your help! This document tells how you can help out.


## Guidelines

The aim of this project is to *give insights into potential security risks of a site*.
Contributions should be aimed towards this and / or improve the development workflow.

### Extending Lighthouse

This project extends [Lighthouse](https://github.com/GoogleChrome/lighthouse) with reporting on security. So we try to stay as close as possible to their setup, guidelines and practices.

### Pull Requests

For new audits or changes to existing audits or gatherers, create a branch and submit a Pull Request. Only add/change 1 feature per Pull Request.

### Code style

The [`.eslintrc`](.eslintrc.js) defines all. This project aims to support Node.js >= 6. New EcmaScript features like `async/await` are therefore not allowed by this configuration.

### Architecture

[Lighthouse Architecture](https://github.com/GoogleChrome/lighthouse/blob/master/docs/architecture.md) is a great explainer on how Lighthouse works, what audits and gatherers are and how to include them in reporting.

### Help texts

Keep the `helpText` of an audit as short as possible. When a reference doc for the audit exists on
developers.google.com/web, the `helpText` should only explain *why* the user should care
about the audit, not *how* to fix it.

Do:

    Serve images that are smaller than the user's viewport to save cellular data and
    improve load time. [Learn more](https://developers.google.com/web/tools/lighthouse/audits/oversized-images).

Don't:

    Serve images that are smaller than the user's viewport to save cellular data and
    improve load time. Consider using responsive images and client hints.

If no reference doc exists yet, then you can use the `helpText` as a stopgap for explaining
both why the audit is important and how to fix it.


## Scripts

Development requires [Node.js](http://nodejs.org/) and [yarn](https://yarnpkg.com/) (alternatively you can use [npm](https://npmjs.org/) which comes bundled with Node.js).

After installing dependencies using `yarn install` the following scripts are available:

`yarn ...` | Description
---|---
`clean` | Removes generated lighthouse and coverage reports.
`coverage` | Runs `unit` tests and generates coverage report in `coverage/`.
`lint` | Checks code style against the [`.eslintrc`](.eslintrc.js) configuration.
`test` | Runs `lint` and `unit` tests.
`unit` | Runs all unit tests in `test/**/*-test.js`.
