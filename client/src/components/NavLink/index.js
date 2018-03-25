import React, { Component } from "react";
// link
import { Link } from "react-router-dom";
// prop types
import PropTypes from "prop-types";
import "./style.scss";

export default class NavLink extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var isActive =
      this.context.router.route.location.pathname === this.props.to;
    var className = isActive ? "active" : "";

    return (
      <Link className={className} {...this.props}>
        {this.props.children}
      </Link>
    );
  }
}

NavLink.contextTypes = {
  router: PropTypes.object
};
