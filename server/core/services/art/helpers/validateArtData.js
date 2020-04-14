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

const validateForConvert = validate({
  source : R.is(Object)
});

module.exports = {
  validateForSearch,
  validateForGetItemById,
  validateForConvert
};
