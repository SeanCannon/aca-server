'use strict';

const R = require('ramda');

const { validateForSearch } = require('../../../helpers/validateArtData');

const search = ({ logger, axios, axiosOptions }) => (data) => {

  validateForSearch(data);

  const EUROPEAN_PAINTINGS_DEPARTMENT_ID = 11;

  const { departmentId=EUROPEAN_PAINTINGS_DEPARTMENT_ID, q='All' } = data.query;

  const endpoint = `https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${departmentId}&q=${q}`;

  return axios.get(endpoint, axiosOptions)
    .then(R.prop('data'))
    .then(({ total, objectIDs : itemIds }) => ({ total, itemIds }))
    .catch(err => {
      logger().error(err);
      throw err;
    });
};

module.exports = search;
