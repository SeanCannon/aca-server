'use strict';

module.exports = {
  search      : ({ logger }) => require('./methods/search')({ logger }),
  getItemById : ({ logger }) => require('./methods/getItemById')({ logger })
};
