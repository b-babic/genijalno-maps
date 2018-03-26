import React, { Component } from "react";
import Login from "../login";
import { Link } from "react-router-dom";
import styles from "./style.scss";

class LandingAuth extends Component {
  render() {
    return (
      <div className={styles.auth}>
        <div className={styles.column}>
          <Login />
        </div>
        <div className={styles.column}>
          <Link to="/signup">
            Click here to <b>sign up</b>
          </Link>
        </div>
      </div>
    );
  }
}

export default LandingAuth;
