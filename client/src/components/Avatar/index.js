import React from "react";
import styles from "./style.scss";

const Avatar = ({ imgSrc, title }) => (
  <div className={styles.user__avatar} title={title}>
    <img src={imgSrc} alt="user profile avatar" />
  </div>
);

export default Avatar;
