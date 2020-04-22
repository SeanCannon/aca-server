#!/usr/bin/env bash

set -a
. ./run/env/demo/.env
set +a

set -a
. ./.env
set +a

node << EOF
  require('events').EventEmitter.prototype._maxListeners = 500;
  const resetMySqlFirst = require('./scripts/resetAndSeedTables').init('coreDb', process.env.PERSIST).reset;

  require('events').EventEmitter.prototype._maxListeners = 500;

  const run = () => Promise.resolve()
    .then(resetMySqlFirst)
    .then(() => {
      require('./server/platform.js');
      console.log('Started core.js...' + process.env.PERSIST + ' platform server is running.');
    }).catch(err => {
      console.error('Could not start core.js. Error: ', err);
      console.log('Retrying in 5 seconds...');
      setTimeout(run, 5000);
    });

  run();
EOF
