import _ from "lodash";

export const storeDocs = (response) => {
  return {
    type: reload ? 'RELOAD_PRODUCTS' : 'FETCH_PRODUCTS',
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

export function fetchDocs(state) {
  return (dispatch, getState) => {
    fetch(`/api/docs/?page=${state.paginationReducer.page}`)
    .then(response => response.json())
    .then(response => {
      dispatch(storeDocs(response))
    })
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