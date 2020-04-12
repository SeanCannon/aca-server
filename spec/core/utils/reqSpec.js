'use strict';

const {
  getRootUrlFromReq,
  isCustomHeader
} = require('../../../server/core/utils/req');

const FAKE_REQUEST_OBJECT = {
  headers : {
    hostname : 'test.com'
  }
};

const EXPECTED_ROOT_URL          = 'https://test.com/',
      EXPECTED_ROOT_URL_FAILOVER = 'https://localhost/';

describe('getRootUrlFromReq', () => {
  it('creates a URL from a host header', () => {
    expect(getRootUrlFromReq(FAKE_REQUEST_OBJECT)).toBe(EXPECTED_ROOT_URL);
  });
  it('falls back to localhost if no headers', () => {
    expect(getRootUrlFromReq({})).toBe(EXPECTED_ROOT_URL_FAILOVER);
  });
  it('falls back to localhost if no host is in the header', () => {
    expect(getRootUrlFromReq({ headers : {} })).toBe(EXPECTED_ROOT_URL_FAILOVER);
  });
});

describe('isCustomHeader', () => {
  it('detects a custom header', () => {
    expect(isCustomHeader('asd')).toBe(false);
  });
});
