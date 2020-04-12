'use strict';

const { validateForGetItemById } = require('../../../helpers/validateArtData');

const getItemById = ({ logger, axios, axiosOptions }) => data => {
  validateForGetItemById(data);

  const { itemId } = data;

  const endpoint = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${itemId}`;

  return axios.get(endpoint, axiosOptions)
    .then(({
     objectID : id,
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
      logger.error(err);
      throw err;
    });
};

module.exports = getItemById;
