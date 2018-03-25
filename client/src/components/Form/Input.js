import React from "react";
import styles from "./style.scss";

const Input = ({ error, ...rest }) => (
  <div className={styles.input__wrapper}>
    <input error={error} {...rest} className={styles.input} />
    {error && <div className={styles.input__error}>{error}</div>}
  </div>
);

export default Input;
