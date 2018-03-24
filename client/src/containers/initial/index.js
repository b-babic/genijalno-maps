import React, { Component } from "react";
import Login from "../login";
import { Link } from "react-router-dom";
//import './style.css';

class LandingAuth extends Component {
  render() {
    return (
      <div className="landing-auth form-container-wrapper">
        <Login />
        <div className="landing-auth-signup">
          <Link to="/signup">
            Click here to <b>sign up</b>
          </Link>
        </div>
      </div>
    );
  }
}

export default LandingAuth;
