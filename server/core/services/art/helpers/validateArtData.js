'use strict';

const V        = require('o-validator'),
      validate = require('../../../utils/validatePayload')('artData'),
      prr      = require('prettycats');

const validateForSearch = validate({});

const validateForGetItemById = validate({
  id : V.required(prr.isNumber)
});

module.exports = {
  validateForSearch,
  validateForGetItemById
};
