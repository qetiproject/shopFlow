const baseConfig = require('../eslint.base.config.cjs');
const baseConfig = require('../eslint.config.cjs');
const cypress = require('eslint-plugin-cypress/flat');
const baseConfig = require('../eslint.config.js');

module.exports = [
  ...baseConfig,

  ...baseConfig,

  cypress.configs['recommended'],

  ...baseConfig,
  {
    // Override or add rules here
    rules: {},
  },
];
