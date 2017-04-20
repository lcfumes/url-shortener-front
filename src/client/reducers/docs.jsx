const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const docsReducer = (store, action) => {
  if (action.type === FETCH_PRODUCTS) {
    return {
      docs: action.docs
    };
  }

  return store || { docs: { total: { value: 0 }, all: { value: 0 }, data: { docs: [] } } };
};
