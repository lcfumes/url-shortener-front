import fetch from 'isomorphic-fetch';

export const fetchRequestSuccess = (payload) => {
	return {
    type: "FETCH_SUCCESS",
    payload
  }
}