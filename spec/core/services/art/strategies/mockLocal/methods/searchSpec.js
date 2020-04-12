'use strict';

const R    = require('ramda'),
      fs   = require('fs'),
      path = require('path');


const logger = require('../../../../../../../server/core/services/log/Log')({});

const search = require('../../../../../../../server/core/services/art/strategies/mockLocal/methods/search')({
  logger
});

let FAKE_DATA;

describe('search', () => {
  beforeAll(() => {
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../../../../../server/core/services/art/strategies/mockLocal/mockData/search.json')));

    FAKE_DATA = data;
  });

  it('responds with data', done => {
    search({ })
      .then(res => {
        expect(res).toEqual(FAKE_DATA);
        done();
      })
      .catch(done.fail);
  });

  it('fails gracefully when no query given', done => {
    search()
      .then(res => {
        expect(res).toEqual(FAKE_DATA);
        done();
      })
      .catch(done.fail);
  });

  it('throws an error when something goes wrong', done => {
    search({ foo : 'bar' })
      .then(done.fail)
      .catch(err => {
        expect(R.isEmpty(err)).toBe(false);
        done();
      });
  });

});
