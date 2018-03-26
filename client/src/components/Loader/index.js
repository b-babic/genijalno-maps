import React from "react";
import styles from "./style.scss";

const Loader = () => (
  <div className={styles.loader__wrapper}>
    <div className={styles.loader} />
  </div>
);

export default Loader;
