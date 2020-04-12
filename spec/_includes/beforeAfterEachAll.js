'use strict';

const fs   = require('fs'),
      path = require('path');

require('dotenv-safe').config({
  path             : path.resolve(__dirname, `../../run/env/${process.env.NODE_ENV}/.env`),
  allowEmptyValues : true,
});

/*
  NOTE: This is required for Node 8+ to prevent deprecation warnings.
  It's a relatively handy way to troubleshoot, just console.log the contents.
  For now, it's disabled because it clutters up the test report.
 */
process.on('unhandledRejection', () => {});

beforeAll(done => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;
  fs.truncate(path.resolve(__dirname, '../support/logs/log.log'), 0, done);
});

beforeEach(() => {
  require.cache = {};
});
