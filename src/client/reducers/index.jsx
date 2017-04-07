import { combineReducers } from "redux";

import { appReducer } from './app';
import { docsReducer } from './docs';
import { paginationReducer } from './pagination';
import { hashCreatedReducer } from './hash';

export default combineReducers({
  appReducer,
  docsReducer,
  paginationReducer,
  hashCreatedReducer
});