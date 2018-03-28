import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const authProps = {
    authenticated: PropTypes.bool
};
const requireAuth = ComposeComponent => {
  class Authentication extends Component {
    render() {
      const { authenticated } = this.props;
      if (!authenticated) {
        // console.log('not authd... we should redirect!');
        return <Redirect to="/" />;
      } else {
        // console.log('authd...show route!');
        return <ComposeComponent {...this.props} />;
      }
    }
  }
  const mapStateToProps = state => ({
    authenticated: state.auth.authenticated
  });
  return connect(mapStateToProps, null)(Authentication);
};

requireAuth.propTypes = authProps;

export default requireAuth;
