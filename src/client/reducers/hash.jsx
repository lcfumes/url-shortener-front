const CHANGE_LAST_HASH = "CHANGE_LAST_HASH";

export const hashCreatedReducer = (store, action) => {
  if (action.type === CHANGE_LAST_HASH) {
    return {
      hash: action.hash
    };
  }
  return store || { hash: "" };
};
