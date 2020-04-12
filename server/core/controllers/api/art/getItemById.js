'use strict';

const _getItemById = ({ ArtSvc : { getItemById }, logger }) => itemId => Promise.resolve(itemId)
  .then(getItemById({ logger }));

module.exports = _getItemById;
