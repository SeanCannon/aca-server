'use strict';

require('dotenv-safe').load();

const redis = require('./services/redis');

const report = service => ([reports, { err }]) => reports.concat([{ service, err }]);

module.exports = () => Promise.resolve([])
  .then(redis)
  .then(report('Redis'));
