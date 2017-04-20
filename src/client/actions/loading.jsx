export const storeLoading = (status) => {
  return {
    type: "CHANGE_STATE",
    status
  };
};


export const updateLoading = (status) => {
  return (dispatch) => {
    dispatch(storeLoading(status));
  };
};
