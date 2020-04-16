'use strict';

const R   = require('ramda'),
      V   = require('o-validator'),
      prr = require('prettycats');

const validate = require('../../../utils/validatePayload')('artData');

const validateForSearch = validate({
  query : R.is(Object)
});

const validateForGetItemById = validate({
  id : V.required(prr.isNumber)
});

const validateForGetItemsByIds = validate({
  ids : V.required(prr.isArray)
});

const validateForConvert = validate({
  source : R.is(Object)
});

module.exports = {
  validateForSearch,
  validateForGetItemById,
  validateForGetItemsByIds,
  validateForConvert
};
