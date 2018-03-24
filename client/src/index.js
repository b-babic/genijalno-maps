import React, { Component } from "react";
import { render } from "react-dom";
// containers
import App from "./containers/app";
// redux stuff
import store from "./store";
import { Provider } from "react-redux";
import { ROOT_URL } from "./api";
// action creators and constants
import { AUTH_USER, FETCH_ADMIN_DATA, UNAUTH_USER } from "./actions/constants";
import { getUserDataDispatcher } from "./actions/actionCreators";

// on app load check for token in localstorage
if (window.localStorage) {
  const token = localStorage.getItem("token");
  const adminEmail = localStorage.getItem("email");

  if (token) {
    store.dispatch({
      type: AUTH_USER
    });
    store.dispatch({
      type: FETCH_ADMIN_DATA,
      payload: adminEmail
    });
  } else {
    store.dispatch({
      type: UNAUTH_USER
    });
  }
}

// initial node
const mountNode = document.getElementById("root");

// take app and render to dom
render(
  <Provider store={store}>
    <App />
  </Provider>,
  mountNode
);
