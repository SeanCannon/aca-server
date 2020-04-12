'use strict';

const cacheUtils = require('../../../server/core/utils/cache');

describe('cacheUtils', () => {

  beforeEach(() => {
    spyOn(cacheUtils._client, 'quit').and.callThrough();
  });

  it('quits when an error is thrown', () => {
    cacheUtils._client.get(null);
    expect(cacheUtils._client.quit).toHaveBeenCalled();
  });
});
