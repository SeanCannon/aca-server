'use strict';

const healthCheck = require('../controllers/health');

const health = (req, res) => {
  const ip = req.header('x-real-ip');

  const renderReports = res => reports => res.render('health', { reports, ip });

  healthCheck()
    .then(renderReports(res))
    .catch(err => {

      /* eslint-disable-next-line */
      console.error('Health Check Error: ', err);
      renderReports(res)([]);
    });
};

module.exports = health;
