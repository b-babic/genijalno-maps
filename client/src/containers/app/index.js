import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router
} from "react-router-dom";
import Home from "../home";
import Dashboard from "../dashboard";
import Signout from "../signout";
import Signup from "../signup";
import About from "../about";
// Primary header
import PrimaryHeader from "../../components/Nav";
// styles
import styles from "./style.scss";

import requireAuth from "../../components/RequireAuth";

//not found
const NotFound = () => <h2>404 Not Found!</h2>;

const AuthLayout = ({ children, ...rest }) => {
  return (
    <div className={styles.auth} {...rest}>
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
          <AuthLayoutRoute exact path="/about" component={requireAuth(About)} />
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
