'use strict';

const axios = require('axios');

const axiosOptions = {
  headers : {
    'Content-Type' : 'application/json'
  }
};

module.exports = {
  search      : ({ logger }) => require('./methods/search')({ logger, axios, axiosOptions }),
  getItemById : ({ logger }) => require('./methods/getItemById')({ logger, axios, axiosOptions })
};
