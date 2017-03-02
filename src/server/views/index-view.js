//
// This is the server side entry point for the React app.
//

import ReduxRouterEngine from "electrode-redux-router-engine";
import {routes} from "../../client/routes";
import {createStore} from "redux";
import rootReducer from "../../client/reducers";
import fetch from 'isomorphic-fetch'
import electrodeConfippet from "electrode-confippet";

const Promise = require("bluebird");

function initialStateHome(req, match) {
  return fetch(electrodeConfippet.config.application.uri)
  .then(response => response.json())
  .then(json => {
    const initState = {
      uri: electrodeConfippet.config.application.uri,
      docs: {
        total: {value: json.total},
        data: {docs: json._embedded}
      }
    };
    const store = createStore(rootReducer, initState);
    return Promise.resolve(store);
  })
  .catch(function(response) {
    console.error('ERRO', response);
  })
}

function createReduxStore(req, match) { // eslint-disable-line
  if (req.url.pathname == "/") {
    return initialStateHome(req, match);
  }

  const initState = {
    uri: electrodeConfippet.config.application.uri
  };
  const store = createStore(rootReducer, initState);
  return Promise.resolve(store);
}

//
// This function is exported as the content for the webapp plugin.
//
// See config/default.json under plugins.webapp on specifying the content.
//
// When the Web server hits the routes handler installed by the webapp plugin, it
// will call this function to retrieve the content for SSR if it's enabled.
//
//

module.exports = (req) => {
  const app = req.server && req.server.app || req.app;
  if (!app.routesEngine) {
    app.routesEngine = new ReduxRouterEngine({routes, createReduxStore});
  }

  return app.routesEngine.render(req);
};