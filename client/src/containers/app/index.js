import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  IndexRoute
} from "react-router-dom";
import Home from "../home";
import Dashboard from "../dashboard";
import Signout from "../signout";
import Signup from "../signup";
//import Navigation from "../../components/Nav";
import PrimaryHeader from "../../components/Nav";
import { NavLink } from "react-router-dom";
// styles
import styles from "./style.scss";

import { connect } from "react-redux";

import requireAuth from "../../components/RequireAuth";

//icons
import HomeIcon from "../../components/Nav/Icons/home.svg";
import InfoIcon from "../../components/Nav/Icons/info.svg";
import ProfileIcon from "../../components/Nav/Icons/user.svg";
//not found
const NotFound = () => <h2>404 Not Found!</h2>;

const AuthLayout = ({ children, ...rest }) => {
  return (
    <div className={styles.auth}>
      <div className={styles.column}>{children}</div>
    </div>
  );
};

const AuthLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <AuthLayout>
          <Component {...matchProps} />
        </AuthLayout>
      )}
    />
  );
};

const PrimaryLayout = () => (
  <div className={styles.dashboard}>
    <PrimaryHeader />
    <main className={styles.main}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/user" component={requireAuth(Dashboard)} />
        <AuthLayoutRoute exact path="/signout" component={Signout} />
        <AuthLayoutRoute exact path="/signup" component={Signup} />
        <Route component={NotFound} />
      </Switch>
    </main>
  </div>
);

const App = () => (
  <Router>
    <Route path="/" component={PrimaryLayout} />
  </Router>
);

export default App;
