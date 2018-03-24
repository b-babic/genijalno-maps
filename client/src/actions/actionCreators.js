import "whatwg-fetch";
import {
  GET_USER_DATA,
  LOADING_USER_DATA,
  LOADED_FIRST_USER_DATA,
  LOADED_USER_DATA,
  GET_USER_DATA_ERROR
} from "./constants";

import { ROOT_URL } from "../api";

export const loadingUserData = payload => ({
  type: LOADING_USER_DATA
});

export const getUserData = payload => {
  return {
    type: GET_USER_DATA,
    payload
  };
};

export const loadedUserData = payload => ({
  type: LOADED_USER_DATA
});

export const loadedFirstUserData = payload => ({
  type: LOADED_FIRST_USER_DATA
});

export const getUserDataError = error => ({
  type: GET_USER_DATA_ERROR,
  payload: error
});

export const getUserDataDispatcher = url => {
  return function(dispatch) {
    dispatch(loadingUserData());
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        dispatch(getUserData(json));
        dispatch(loadedUserData());
        dispatch(loadedFirstUserData());
      })
      .catch(err => dispatch(getUserDataError(err)));
  };
};
