import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./styles.scss";
// nav link
import { NavLink } from "react-router-dom";

console.warn("scss", styles);

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.handleRenderLogoutLink = this.handleRenderLogoutLink.bind(this);
  }

  handleRenderLogoutLink() {
    if (this.props.isAuthenticated) {
      return (
        <NavLink className={styles.navLink} to="/signout">
          Sign out
        </NavLink>
      );
    }
  }

  render() {
    return (
      <nav className={styles.navbar}>
        <NavLink
          exact
          to="/user"
          className={styles.link}
          activeClassName={styles.active}
        >
          Dashboard
        </NavLink>
        <NavLink
          exact
          to="/about"
          className={styles.link}
          activeClassName={styles.active}
        >
          About
        </NavLink>
        {this.handleRenderLogoutLink()}
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.authenticated
});

export default connect(mapStateToProps, null)(Navigation);
