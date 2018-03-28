import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./style.scss";
import cx from "classnames";
//icons
import HomeIcon from "./Icons/home.svg";
import InfoIcon from "./Icons/info.svg";
import ProfileIcon from "./Icons/user.svg";
// props
import PropTypes from "prop-types";

const headerProps = {
    isAuthenticated: PropTypes.bool
};

class PrimaryHeader extends React.Component {
  constructor(props) {
    super(props);
    this.handleRenderLogoutLink = this.handleRenderLogoutLink.bind(this);
  }
  handleRenderLogoutLink() {
    if (this.props.isAuthenticated) {
      return (
        <li>
          <NavLink to="/signout" activeClassName={styles.active}>
            <ProfileIcon className={styles.icon} />
            Logout
            <div className={styles.tooltip}>Logout</div>
          </NavLink>
        </li>
      );
    }
  }
  render() {
    const activeLink = cx({
      [styles.active]: this.props.isAuthenticated
    });

    if (this.props.isAuthenticated) {
      return (
        <nav className={styles.navbar}>
          <ul>
            <li className={styles.tooltip}>
              <NavLink to="/user" exact activeClassName={activeLink}>
                <HomeIcon className={styles.icon} />
                About
                <div className={styles.tooltip}>About</div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" activeClassName={activeLink}>
                <InfoIcon className={styles.icon} />
                Info
                <div className={styles.tooltip}>Info</div>
              </NavLink>
            </li>
            {this.handleRenderLogoutLink()}
          </ul>
        </nav>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.authenticated
});

PrimaryHeader.propTypes = headerProps;

export default connect(mapStateToProps, null, null, { pure: false })(
  PrimaryHeader
);
