'use strict';

const R = require('ramda');

const FAKE_ERR                                 = { foo : 'bar' },
      FAKE_ERR_WITH_STATUS_CODE                = { foo : 'bar', statusCode : 404 },
      FAKE_DECORATED_ERR_PRESERVED_STATUS_CODE = {
        err        : R.omit(['statusCode'], FAKE_ERR_WITH_STATUS_CODE),
        statusCode : FAKE_ERR_WITH_STATUS_CODE.statusCode
      },
      FAKE_DECORATED_ERR_DEFAULT_STATUS_CODE   = {
        err        : FAKE_ERR,
        statusCode : 501
      };

describe('config', () => {
  const config = require('config');
  it('decorates an error for json logging, defaulting to 501 status', () => {
    expect(config.errors.decorateForJson(FAKE_ERR)).toEqual(FAKE_DECORATED_ERR_DEFAULT_STATUS_CODE);
  });
  it('decorates an error for json logging', () => {
    expect(config.errors.decorateForJson(FAKE_ERR_WITH_STATUS_CODE)).toEqual(FAKE_DECORATED_ERR_PRESERVED_STATUS_CODE);
  });
});
