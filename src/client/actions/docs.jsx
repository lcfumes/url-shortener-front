import { updateLoading } from "./loading";

export const storeDocs = (response) => {
  return {
    type: "FETCH_PRODUCTS",
    docs: {
      total: { value: response.total },
      all: { value: response.all },
      data: { docs: response._embedded }
    }
  };
};

export const changePage = (page) => {
  return {
    type: "CHANGE_PAGE",
    page
  };
};

export const updateHashCreated = (hash) => {
  return {
    type: "CHANGE_LAST_HASH",
    hash
  };
};

export const fetchDocs = (state) => {
  return (dispatch) => {
    dispatch(updateLoading(true));
    fetch(`${state.appReducer.uri}?page=${state.paginationReducer.page}`)
    .then((response) => response.json())
    .then((response) => {
      dispatch(storeDocs(response));
      dispatch(updateLoading(false));
    });
  };
};

export const createUrl = (url) => {
  return (dispatch, getState) => {
    const state = getState();
    fetch(state.appReducer.uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        url
      })
    })
    .then((response) => response.json())
    .then((response) => {
      dispatch(updateHashCreated(response._embedded[0].hash));
      dispatch(changePage(1));
      dispatch(fetchDocs(getState()));
    });
  };
};

export const updateHash = (hash) => {
  return (dispatch) => {
    dispatch(updateHashCreated(hash));
  };
};

export const updateDocs = () => {
  return (dispatch, getState) => {
    dispatch(fetchDocs(getState()));
  };
};

export const updatePage = (page) => {
  return (dispatch, getState) => {
    dispatch(changePage(page));
    dispatch(fetchDocs(getState()));
  };
};
