#!/usr/bin/env bash

set -a
. ./run/env/$1/.env
set +a

if [ $2 = "up" ]; then
  echo "Cleaning up any active Docker containers.."
  docker-compose down

  echo "Gutting tmp folder..."
  rm -rf ./tmp
  mkdir -p -m 0755 ./tmp/env/$1

  echo "Starting Docker containers..."
  docker-compose up
else
  docker-compose down
fi
