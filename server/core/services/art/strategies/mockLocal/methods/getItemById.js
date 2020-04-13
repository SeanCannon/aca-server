'use strict';

const fs   = require('fs'),
      path = require('path'),
      R    = require('ramda');

const { validateForGetItemById } = require('../../../helpers/validateArtData');

const itemData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../mockData/item.json')));

const getItemById = ({ logger }) => id => new Promise((resolve, reject) => {
  Promise.resolve({ id })
    .then(validateForGetItemById)
    .then(R.prop('id'))
    .then(R.propOr({}, R.__, itemData))
    .then(resolve)
    .catch(err => {
      logger.error(err);
      reject(err);
    });
});


module.exports = getItemById;
