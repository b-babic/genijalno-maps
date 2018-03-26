import React, { Component } from "react";
import { connect } from "react-redux";
import { Mapview } from "../mapview";
import {
  getUserDataDispatcher,
  setSelectedUser,
  activateSidebar
} from "../../actions/actionCreators";
import { ROOT_URL } from "../../api";
import Sidebar from "../sidebar";
import Loader from "../../components/Loader";
import styles from "./style.scss";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleDisplayContents = this.handleDisplayContents.bind(this);
    this.onMarkerTapped = this.onMarkerTapped.bind(this);

    this.state = {
      markers: this.props.activeData || null
    };
  }

  handleDisplayContents() {
    const { firstUserDataLoaded } = this.props;
    if (!firstUserDataLoaded && !this.state.markers) {
      return (
        <span>
          <Sidebar />
          <Loader />
        </span>
      );
    } else {
      return (
        <span>
          <Sidebar />
          <Mapview
            isMarkerShown
            markers={this.state.markers}
            onMarkerTapped={this.onMarkerTapped}
          />
        </span>
      );
    }
  }

  onMarkerTapped(marker, index) {
    let newMarkers = this.props.activeData; // Object.assign({}, this.state.markers)
    console.warn("newmarkesr", newMarkers);
    for (var i = 0; i < newMarkers.length; i++) {
      if (i === index) {
        newMarkers[i].isActive = !newMarkers[i].isActive;
      } else {
        newMarkers[i].isActive = false;
      }
    }

    this.setState({
      markers: newMarkers
    });
    // open sidebar and set active data set to show in sidebar
    this.props.handleSetSelectedUser(marker);
    this.props.handleActivateSidebar();
  }

  componentDidMount() {
    const { handleFetchUserData } = this.props;
    handleFetchUserData(`${ROOT_URL}/api/data`);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeData !== this.state.markers) {
      this.setState({
        markers: nextProps.activeData
      });
    }
  }

  render() {
    return (
      <div className={styles.dashboard}>{this.handleDisplayContents()}</div>
    );
  }
}

const mapStateToProps = state => ({
  firstUserDataLoaded: state.userData.firstLoaded,
  activeData: state.userData.data,
  activeId: state.selectedUser.activeData._id
});
const mapDispatchToProps = dispatch => ({
  handleFetchUserData: url => {
    dispatch(getUserDataDispatcher(url));
  },
  handleSetSelectedUser: data => {
    dispatch(setSelectedUser(data));
  },
  handleActivateSidebar: () => {
    dispatch(activateSidebar());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
