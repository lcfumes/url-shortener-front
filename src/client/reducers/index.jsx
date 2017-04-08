import { combineReducers } from "redux";

import { appReducer } from './app';
import { docsReducer } from './docs';
import { paginationReducer } from './pagination';
import { hashCreatedReducer } from './hash';
import { loadingReducer } from './loading';

export default combineReducers({
  appReducer,
  docsReducer,
  paginationReducer,
  hashCreatedReducer,
  loadingReducer
});