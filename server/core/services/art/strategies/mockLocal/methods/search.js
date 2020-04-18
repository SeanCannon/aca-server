'use strict';

const fs   = require('fs'),
      path = require('path');

const { validateForSearch } = require('../../../helpers/validateArtData');

const searchData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../mockData/search.json')));

const search = ({ logger }) => (data={}) => new Promise((resolve, reject) => {
  Promise.resolve(data)
    .then(validateForSearch)
    .then(() => resolve(searchData))
    .catch(err => {
      logger().error(err);
      reject(err);
    });
});

module.exports = search;
