import _ from "lodash";

export const storeDocs = (response) => {
  return {
    type: 'FETCH_PRODUCTS',
    docs: {
      total: { value: response.total },
      all: { value: response.all },
      data: { docs: response._embedded }
    }
  }
}

export const changePage = (page) => {
  return {
    type: 'CHANGE_PAGE',
    page
  }
}

export const updateHashCreated = (hash) => {
  return {
    type: 'CHANGE_LAST_HASH',
    hash
  }
}

export function fetchDocs(state) {
  return (dispatch, getState) => {
    fetch(`${state.appReducer.uri}?page=${state.paginationReducer.page}`)
    .then(response => response.json())
    .then(response => {
      dispatch(storeDocs(response))
    })
  }
}

export function createUrl(url) {
  return (dispatch, getState) => {
    let state = getState();
    fetch(state.appReducer.uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: url
      })
    })
    .then(response => response.json())
    .then(response => {
      dispatch(updateHashCreated(response._embedded[0].hash))
      dispatch(changePage(1))
      dispatch(fetchDocs(getState()))
    });
  }
}

export function updateHash(hash) {
  return (dispatch, getState) => {
    dispatch(updateHashCreated(hash));
  }
}

export function updateDocs() {
  return (dispatch, getState) => {
    dispatch(fetchDocs(getState()))
  }
}

export function updatePage(page) {
  return (dispatch, getState) => {
    dispatch(changePage(page))
    dispatch(fetchDocs(getState()))
  }
}