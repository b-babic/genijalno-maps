import React, { Component } from "react";
import enhanceWithClickOutside from "react-click-outside";
import Avatar from "../../components/Avatar";
import InfoDisplay from "../../components/InfoDisplay";
import "./style.css";
import { connect } from "react-redux";
import {
  activateSidebar,
  deactivateSidebar,
  deleteSelectedUser
} from "../../actions/actionCreators";

class Sidebar extends Component {
  handleClickOutside() {
    const {
      activeState,
      handleDeactivateSidebar,
      handleDeleteSelectedUser
    } = this.props;
    if (activeState) {
      handleDeactivateSidebar();
      handleDeleteSelectedUser();
    }
  }
  render() {
    const {
      activeData,
      activeState,
      handleActivateSidebar,
      handleDeactivateSidebar
    } = this.props;
    const controlClickEvent = activeState
      ? handleDeactivateSidebar
      : handleActivateSidebar;
    const displayControlClass = activeData ? "active" : "";
    return (
      <div className={`right-panel panel-shadow ${activeState}`}>
        <div
          className={`right-panel-control ${displayControlClass}`}
          onClick={controlClickEvent}
        >
          <div className="responsive-svg-wrapper">
            <svg
              className="svg-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="13px"
              height="24px"
              viewBox="0 0 22 22"
              aria-labelledby="title"
            >
              <title id="title">control</title>
              <path
                fill="#A8AAAD"
                d="M10.9 8.4c0-.6.3-.7.7-.3l6.8 6.3c.4.4.4 1 0 1.4l-6.8 6.3c-.4.4-.7.2-.7-.3V8.4z"
              />
            </svg>
          </div>
        </div>
        <Avatar imgSrc={activeData.avatar} title="user-avatar-picture" />
        <InfoDisplay data={activeData} />
      </div>
    );
  }
}

const WrappedSidebar = enhanceWithClickOutside(Sidebar);

const mapStateToProps = state => ({
  activeState: state.ui.sidebar,
  activeData: state.selectedUser.activeData
});

const mapDispatchToProps = dispatch => ({
  handleActivateSidebar: () => {
    dispatch(activateSidebar());
  },
  handleDeactivateSidebar: () => {
    dispatch(deactivateSidebar());
  },
  handleDeleteSelectedUser: () => {
    dispatch(deleteSelectedUser());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedSidebar);
