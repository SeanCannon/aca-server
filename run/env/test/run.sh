#!/usr/bin/env bash

set -a
. ./run/env/test/.env
set +a


OS=$(bash ./scripts/echo_os.sh)

RUN_TESTS() {
  ./node_modules/.bin/nyc --reporter=lcov --reporter=text-summary --exclude=spec ./node_modules/.bin/jasmine
}

if [ ${OS} == "WINDOWS" ]; then
  RUN_TESTS
elif [ ${OS} == "LINUX" ]; then
  RUN_TESTS
elif [ ${OS} == "MAC" ]; then
  RUN_TESTS && say 'Unit Tests Passed' || say 'Unit Tests Failed'
fi
