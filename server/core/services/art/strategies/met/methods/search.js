'use strict';

const R = require('ramda');

const { validateForSearch } = require('../../../helpers/validateArtData');

const search = ({ logger, axios, axiosOptions }) => (data={}) => {

  validateForSearch(data);

  const endpoint = `https://collectionapi.metmuseum.org/public/collection/v1/search?material=Paintings|Canvas&q=All`;

  return axios.get(endpoint, axiosOptions)
    .then(R.prop('data'))
    .then(({ total, objectIDs : itemIds }) => ({ total, itemIds }))
    .catch(err => {
      logger.error(err);
      throw err;
    });
};

module.exports = search;
