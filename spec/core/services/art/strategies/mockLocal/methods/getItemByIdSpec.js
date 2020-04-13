'use strict';

const R    = require('ramda'),
      fs   = require('fs'),
      path = require('path');

const commonMocks = require('../../../../../../_helpers/commonMocks');

const logger = require('../../../../../../../server/core/services/log/Log')({});

const getItemById = require('../../../../../../../server/core/services/art/strategies/mockLocal/methods/getItemById')({
  logger
});

const FAKE_UNKNOWN_ID = 999;

let KNOWN_TEST_ID,
    FAKE_DATA;

describe('getItem', () => {
  beforeAll(() => {
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../../../../../server/core/services/art/strategies/mockLocal/mockData/item.json')));

    const firstItemId = R.compose(R.head, R.keys)(data);

    KNOWN_TEST_ID = parseInt(firstItemId, 10);

    FAKE_DATA = data[KNOWN_TEST_ID];
  });

  it('responds with data when using a known itemId', done => {
    getItemById(KNOWN_TEST_ID)
      .then(res => {
        expect(res).toEqual(FAKE_DATA);
        done();
      })
      .catch(done.fail);
  });

  it('responds with an empty data set when given an unknown itemId', done => {
    getItemById(FAKE_UNKNOWN_ID)
      .then(res => {
        expect(res).toEqual({});
        done();
      })
      .catch(done.fail);
  });

  it('rejects when given a malformed itemId', done => {
    getItemById(KNOWN_TEST_ID + '')
      .then(done.fail)
      .catch(err => {
        expect(err).toEqual(commonMocks.illegalParamErr('artData', 'id'));
        done();
      });
  });

  it('rejects when missing itemId', done => {
    getItemById()
      .then(done.fail)
      .catch(err => {
        expect(err).toEqual(commonMocks.missingParamErr('artData', 'id'));
        done();
      });
  });

});
