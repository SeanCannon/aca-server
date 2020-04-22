'use strict';

const prr      = require('prettycats'),
      V        = require('o-validator'),
      validate = require('../../../utils/validatePayload')('renderData');

const validateForInsert = validate({
  image              : V.required(prr.isStringOfLengthAtMost(100)),
  galleryStrategyKey : V.required(prr.isStringOfLengthAtMost(20)),
  galleryItemId      : V.required(prr.isPositiveNumber),
  authorIp           : prr.isString
});

const validateForGet = validate({
  offset : prr.isAtLeastZero,
  limit  : prr.isPositiveNumber
});

module.exports = {
  validateForGet,
  validateForInsert
};
