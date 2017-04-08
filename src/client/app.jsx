//
// This is the client side entry point for the React app.
//

import React from "react";
import {render} from "react-dom";
import {routes} from "./routes";
import {Router, browserHistory} from "react-router";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

/*  */
import {notify} from "react-notify-toast";
/*  */
import "./styles/base.css";
import rootReducer from "./reducers";

import injectTapEventPlugin from "react-tap-event-plugin";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

window.webappStart = () => {
  injectTapEventPlugin(); // https://github.com/callemall/material-ui/issues/4670
};

// Add the client app start up code to a function as window.webappStart.
// The webapp's full HTML will check and call it once the js-content
// DOM is created.
/**/
require.ensure(["./sw-registration"], (require) => {
  require("./sw-registration")(notify);
}, "sw-registration");
/**/
window.webappStart = () => {
  const initialState = window.__PRELOADED_STATE__;
  const loggerMiddleware = createLogger()
  const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware)));
  render(
    <Provider store={store}>
      <Router history={browserHistory} store={store}>{routes}</Router>
    </Provider>,
    document.querySelector(".js-content")
  );
};
