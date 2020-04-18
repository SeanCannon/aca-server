'use strict';

const R = require('ramda');

const { validateForGetItemById } = require('../../../helpers/validateArtData');

const getItemById = ({ logger, axios, axiosOptions }) => id => {
  validateForGetItemById({ id });

  const endpoint = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;

  return axios.get(endpoint, axiosOptions)
    .then(R.prop('data'))
    .then(({
     title,
     primaryImage,
     primaryImageSmall
   }) => ({
      id,
      title,
      primaryImage,
      primaryImageSmall
    }))
    .catch(err => {
      logger().error(err);
      throw err;
    });
};

module.exports = getItemById;
