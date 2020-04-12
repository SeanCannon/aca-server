'use strict';


const R      = require('ramda'),
      config = require('config'),
      http   = require('http');

const core              = require('./core/core'),
      nodePorts         = config.server.nodePorts,
      listener          = [core],
      startServerOnPort = port => http.createServer(...listener).listen(port),
      startServers      = R.forEach(startServerOnPort);

startServers(nodePorts);
