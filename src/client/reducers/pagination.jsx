const CHANGE_PAGE = 'CHANGE_PAGE'

export const paginationReducer = (store, action) => {
  if(action.type == CHANGE_PAGE) {
    return { page: action.page }
  }

  return store || { page: 0 }
}