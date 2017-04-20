const CHANGE_STATE = "CHANGE_STATE";

export const loadingReducer = (store, action) => {
  if (action.type === CHANGE_STATE) {
    return { loading: action.status };
  }
  return store || { loading: false };
};
