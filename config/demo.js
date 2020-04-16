'use strict';

const config = {

  server : {
    corsWhitelist : {
      patternString : 'animalcrossingart.[test|com]',
      flags         : 'i'
    }
  },

  auth : {
    jwtOptions : {
      expiresIn : '20m'
    }
  }

};

module.exports = config;

/* eslint-disable-next-line */
console.log('USING DEMO CONFIG');
