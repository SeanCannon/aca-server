#!/usr/bin/env bash

set -a
. ./run/env/demo/.env
set +a

set -a
. ./.env
set +a

echo FLUSHALL | redis-cli -h "${REDIS_HOST}" -p "${REDIS_PORT}" -a "${REDIS_PASSWORD}"

node << EOF
  require('events').EventEmitter.prototype._maxListeners = 500;
  require('./server/platform.js');
EOF
