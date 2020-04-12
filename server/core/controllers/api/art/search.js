'use strict';

const _search = ({ ArtSvc : { search }, logger }) => props => Promise.resolve(props)
  .then(search({ logger }));

module.exports = _search;
