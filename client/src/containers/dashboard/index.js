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
    // random user data

    const genders = ["male", "female"];
    const locales = [
      "sq_AL",
      "en_US",
      "zh_CN",
      "da_DK",
      "en_ZA",
      "fr_CA",
      "ja_JP",
      "es_PR",
      "uk_UA",
      "en_IN"
    ];
    const maleProfilePhotoLinks = [
      "http://i.pravatar.cc/280?img=3",
      "http://i.pravatar.cc/280?img=6",
      "http://i.pravatar.cc/280?img=7",
      "http://i.pravatar.cc/280?img=8",
      "http://i.pravatar.cc/280?img=11",
      "http://i.pravatar.cc/280?img=12",
      "http://i.pravatar.cc/280?img=61",
      "http://i.pravatar.cc/280?img=57",
      "http://i.pravatar.cc/280?img=58",
      "http://i.pravatar.cc/280?img=22",
      "http://i.pravatar.cc/280?img=13"
    ];
    const femaleProfilePhotoLinks = [
      "http://i.pravatar.cc/280?img=5",
      "http://i.pravatar.cc/280?img=9",
      "http://i.pravatar.cc/280?img=10",
      "http://i.pravatar.cc/280?img=25",
      "http://i.pravatar.cc/280?img=48",
      "http://i.pravatar.cc/280?img=49",
      "http://i.pravatar.cc/280?img=43",
      "http://i.pravatar.cc/280?img=1",
      "http://i.pravatar.cc/280?img=35",
      "http://i.pravatar.cc/280?img=30",
      "http://i.pravatar.cc/280?img=31"
    ];

    const timezones = [
      "GMT+5.5",
      "GMT+0.5",
      "GMT-3.5",
      "GMT+1.5",
      "GMT+2.5",
      "GMT-0.5",
      "GMT+5.2",
      "GMT-3.5"
    ];

    const latitudes = [
      "14.21",
      "57.9",
      "34.55",
      "52.22",
      "39.55",
      "35.48",
      "47.21",
      "41.17",
      "52.14",
      "48.14",
      "35.40",
      "34.0",
      "31.10",
      "55.27"
    ];

    const longitudes = [
      "9.21",
      "57.9",
      "134.55",
      "66.22",
      "5.55",
      "0.48",
      "153.21",
      "8.17",
      "52.14",
      "70.14",
      "35.40",
      "34.0",
      "32.10",
      "55.27"
    ];
    //generaterandom
    const getRandomItem = arr => arr[Math.floor(Math.random() * arr.length)];

    const generateRandomUserData = () => {
      const gender = getRandomItem(genders);
      const locale = getRandomItem(locales);
      const avatar =
        gender === "female"
          ? getRandomItem(femaleProfilePhotoLinks)
          : getRandomItem(maleProfilePhotoLinks);
      const timezone = getRandomItem(timezones);
      const lat = getRandomItem(latitudes);
      const long = getRandomItem(longitudes);
      return {
        gender,
        locale,
        avatar,
        timezone,
        lat,
        long
      };
    };

    let res = [];

    for (var i = 0; i < 12; i++) {
      let data = generateRandomUserData();
      res.push(data);
    }

    console.log(JSON.stringify(res));
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
