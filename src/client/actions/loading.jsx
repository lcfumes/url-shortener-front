export const storeLoading = (status) => {
  return {
    type: `CHANGE_STATE`,
    status
  }
}


export function updateLoading(status) {
  return (dispatch, getState) => {
    dispatch(storeLoading(status))
  }
}