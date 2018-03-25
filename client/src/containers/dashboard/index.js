import React, { Component } from "react";
import Navigation from "../../components/Nav";
import MapView from "../mapview";
import styles from "./style.scss";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <MapView />
      </div>
    );
  }
}
