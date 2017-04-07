const FETCH_PRODUCTS = "FETCH_PRODUCTS"
const RELOAD_PRODUCTS = "RELOAD_PRODUCTS"

export const docsReducer = (store, action) => {
  if (action.type === FETCH_PRODUCTS ) {
    return { 
      docs: {
        total: { value: store.total + action.total },
        all: { value: action.all },
        data: { docs: store.data.docs.concat(action._embedded) }
      }
    }
  }

  if (action.type === RELOAD_PRODUCTS ) {
    return {
      docs: {
        total: {value: action.payload.total},
        all: {value: action.payload.all},
        data: {docs: action.payload._embedded}
      }
    }
  }

  return store || { docs: { total: { value: 0 }, all: { value: 0 }, data: { docs: [] } } }
};