import {combineReducers} from "redux";

const total = (store, action) => {
  return store || {total:0}
}

const data = (store, action) => {
  return store || {docs:[]}
}

export default combineReducers({
  total,
  data
});
