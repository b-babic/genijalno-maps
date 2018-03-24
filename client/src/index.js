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

// initial node
const mountNode = document.getElementById("root");

// take app and render to dom
render(
  <Provider store={store}>
    <App />
  </Provider>,
  mountNode
);
