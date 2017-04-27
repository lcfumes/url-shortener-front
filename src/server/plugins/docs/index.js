"use strict";

import fetch from "isomorphic-fetch";

exports.register = (server, options, next) => {

  server.route({
    method: 'GET',
    path: '/api/docs/',
    handler: (request, reply) => {
      let page = (request.query.page === undefined) ? 1 : request.query.page;
      fetch(`https://api.lfum.es?page=${request.query.page}`)
      .then(response => response.json())
      .then(json => {
        reply(json)
      })
    }
  })

  server.route({
    method: 'POST',
    path: '/api/docs/',
    handler: (request, reply) => {
      fetch(`https://api.lfum.es`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: request.payload.url
        })
      })
      .then(response => response.json())
      .then(response => {
        reply(response)
      })
      .catch(response => console.log(response))
    }
  })

  next()

};

exports.register.attributes = require('./pkg.json');