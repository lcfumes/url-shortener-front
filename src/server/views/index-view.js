//
// This is the server side entry point for the React app.
//

import ReduxRouterEngine from "electrode-redux-router-engine";
import {routes} from "../../client/routes";
import {createStore} from "redux";
import rootReducer from "../../client/reducers";
import fetch from 'isomorphic-fetch'
import electrodeConfippet from "electrode-confippet";
import _ from "lodash";

const Promise = require("bluebird");
let initialState;

function createStoreCallback() {
  return fetch(`${electrodeConfippet.config.application.uri}?page=${initialState.paginationReducer.page}`)
  .then(response => response.json())
  .then(response => {
    _.merge(initialState, {
      docsReducer: {
        docs: {
          total: { value: response.total },
          all: { value: response.all },
          data: { docs: response._embedded }
        }
      }
    })
  
    const store = createStore(rootReducer, initialState);
    return Promise.resolve(store);
  })
  .catch(function(response) {
    console.error('ERRO', response);
  })
}

function createReduxStore(req, match) { // eslint-disable-line
  if (req.url.pathname == "/") {
    return createStoreCallback();
  }

  const store = createStore(rootReducer, initialState);
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

  let page = (req.query.page !== undefined) ? req.query.page : 1;

  initialState = {
    appReducer: {
      uri: electrodeConfippet.config.application.uri
    },
    paginationReducer: {
      page: page
    },
    docsReducer: {
      docs: {
        total: { value: 0 },
        all: { value: 0 },
        data: { docs: [] }
      }
    },
    hashCreatedReducer: {
      hash: ''
    }
  }
  const app = req.server && req.server.app || req.app;
  if (!app.routesEngine) {
    app.routesEngine = new ReduxRouterEngine({routes, createReduxStore});
  }

  return app.routesEngine.render(req);
};