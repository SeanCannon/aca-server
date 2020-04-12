#!/usr/bin/env bash

set -a
. ./run/env/demo/.env
set +a

rm -rf ./tmp
mkdir -p -m 0755 ./tmp/env/demo
docker-compose up
