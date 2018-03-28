import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// initial screen
import HomeInitial from "../initial";
import PropTypes from "prop-types";

const homeProps = {
    isAuthenticated: PropTypes.bool
};

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/user" />;
    }

    return <HomeInitial />;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.authenticated
});

Home.propTypes = homeProps;

export default connect(mapStateToProps, null)(Home);
