import {combineReducers} from "redux";

const docs = (store, action) => {
	if (action.type === "FETCH_SUCCESS") {
		return {
	      total: {value: action.payload.total},
	      all: {value: action.payload.all},
	      data: {docs: action.payload._embedded}
	    }
		return action.payload;
	}
	return store || {docs: { total: {value: 0}, all: {value:0}, data: {docs: []} }}
}

const uri = (store, action) => {
	return store || { uri: "" }
}

export default combineReducers({
  docs,
  uri
});
