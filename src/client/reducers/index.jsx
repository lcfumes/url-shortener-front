import { combineReducers } from "redux";

import { appReducer } from './app';
import { docsReducer } from './docs';
import { paginationReducer } from './pagination';

export default combineReducers({
  appReducer,
  docsReducer,
  paginationReducer
});