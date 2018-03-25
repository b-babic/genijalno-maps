import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signoutUser } from "../../actions/actionCreators";

import styles from "./style.scss";

class Signout extends Component {
  componentWillMount() {
    this.props.handleSignoutUser();
  }
  render() {
    return (
      <div className={styles.logout}>
        <div className={styles.emoji}>
          <span className={styles.eyes} />
          <span className={styles.mouth} />
        </div>
        <Link to="/">Sign in again. . .</Link>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleSignoutUser: () => {
    dispatch(signoutUser());
  }
});

export default connect(null, mapDispatchToProps)(Signout);
