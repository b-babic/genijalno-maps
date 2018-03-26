import "whatwg-fetch";
import {
  AUTH_ERROR,
  AUTH_ERROR_RESET,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_LOADING,
  AUTH_LOADED,
  GET_USER_DATA,
  LOADING_USER_DATA,
  LOADED_USER_DATA,
  LOADED_FIRST_USER_DATA,
  GET_USER_DATA_ERROR
} from "./constants";

import { ROOT_URL } from "../api";

// AUTH
export const authError = error => ({
  type: AUTH_ERROR,
  payload: error
});

export const authErrorReset = () => ({
  type: AUTH_ERROR_RESET
});

export const authLoading = () => ({
  type: AUTH_LOADING
});

export const authLoaded = () => ({
  type: AUTH_LOADED
});

export const signinUser = (username, password) => {
  console.warn("SENDING", username, password);
  return function(dispatch) {
    dispatch({ type: AUTH_LOADING });
    return fetch(`${ROOT_URL}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // if req is good & auth'd
        // update state to auth'd
        console.warn("RESPONSE", responseJson);
        if (responseJson && responseJson.success === true) {
          dispatch({ type: AUTH_USER });
          // save JWT in localStorage
          console.warn("TOKEN", responseJson);
          localStorage.setItem("token", responseJson.token);
          // save admin email in localStorage
          localStorage.setItem("email", responseJson.email);
          dispatch({ type: AUTH_LOADED });
        } else {
          dispatch(
            authError(
              "Your email or password is incorrect. \n Please try again."
            )
          );
          dispatch({ type: AUTH_LOADED });
        }
      })
      .catch(err => {
        dispatch(
          authError("Error while trying to login user. Try again later!")
        );
        dispatch({ type: AUTH_LOADED });
      });
  };
};

// SIGN OUT
export const signoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  return {
    type: UNAUTH_USER
  };
};

// SIGN UP USER
export const signupUser = (username, password, email) => {
  console.warn("signin up", username, password, email);
  return function(dispatch) {
    dispatch({ type: AUTH_LOADING });
    return fetch(`${ROOT_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        email
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.warn("MSG", responseJson);
        if (responseJson.success === false) {
          dispatch(authError(responseJson.message));
          dispatch({ type: AUTH_LOADED });
          return false;
        } else {
          // if req is good & auth'd
          // update state to auth'd
          console.warn("SHOULD AUTH NOW AND FETCH EMAIL", responseJson);
          dispatch({ type: AUTH_USER });
          // save JWT in localStorage
          localStorage.setItem("token", responseJson.token);
          // save admin email in localStorage
          localStorage.setItem("email", responseJson.email);
          dispatch({ type: AUTH_LOADED });
        }
      })
      .catch(err => {
        // console.log('error in signupUser: ', err);
        // dispatch(authError(err.response.data.error));
        console.warn("ERROR IN SIGNUP");
        dispatch(authError("Error in signup..."));
        dispatch({ type: AUTH_LOADED });
      });
  };
};

// USER DATA
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
