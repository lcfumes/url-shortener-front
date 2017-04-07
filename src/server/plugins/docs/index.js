"use strict";

import fetch from "isomorphic-fetch";

exports.register = (server, options, next) => {

  server.route({
    method: 'GET',
    path: '/api/docs',
    handler: (request, reply) => {
      fetch(`http://api.lfum.es?page=${page}`)
      .then(response => response.json())
      .then(json => {
        reply(fetchRequestSuccess(json))
      })
    }
  })

  next()

};

exports.register.attributes = require('./pkg.json');