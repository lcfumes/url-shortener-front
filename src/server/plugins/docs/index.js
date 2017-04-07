"use strict";

import fetch from "isomorphic-fetch";

exports.register = (server, options, next) => {

  server.route({
    method: 'GET',
    path: '/api/docs/',
    handler: (request, reply) => {
      let page = (request.query.page === undefined) ? 1 : request.query.page;
      fetch(`http://api.lfum.es?page=${request.query.page}`)
      .then(response => response.json())
      .then(json => {
        reply(json)
      })
    }
  })

  next()

};

exports.register.attributes = require('./pkg.json');