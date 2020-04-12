#!/usr/bin/env bash

set -a
. ./run/env/demo/.env
set +a

set -a
. ./.env
set +a

docker-compose down
docker-compose -f docker-compose-remote.yml up
