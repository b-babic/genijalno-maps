import React from "react";
import styles from "./style.scss";

const getStandardDate = dateMs => {
  let d = new Date(dateMs);
  return d.toLocaleString();
};

const InfoDisplay = ({ data }) => (
  <div className={styles.info__display}>
    <div className={styles.info__row}>
      <label htmlFor="status">Status:</label>
      <br />
      <span
        id="status"
        className={
          `user__status user__status--` + data.status ? `online` : `offline`
        }
      >
        {data.status ? "online" : "away"}
      </span>
    </div>
    <div className={styles.info__row}>
      <label htmlFor="gender">Gender:</label>
      <br />
      <span id="gender" className="user-detail">
        {data.gender}
      </span>
    </div>
    <div className={styles.info__row}>
      <label htmlFor="locale">Locale:</label>
      <br />
      <span id="locale" className="user-detail">
        {data.locale}
      </span>
    </div>
    <div className={styles.info__row}>
      <label htmlFor="timezone">Time zone:</label>
      <br />
      <span id="timezone" className="user-detail">
        {data.timezone}
      </span>
    </div>
    <div className={styles.info__row}>
      <label htmlFor="timezone">Time of joining:</label>
      <br />
      <span id="timezone" className="user-detail">
        {getStandardDate(Date.parse(data.timeStamp))}
      </span>
    </div>
    <div className={styles.info__row}>
      <label htmlFor="latitude">Latitude:</label>
      <br />
      <span id="latitude" className="user-detail">
        {data.lat} ° N
      </span>
    </div>
    <div className={styles.info__row}>
      <label htmlFor="longtitude">Longtitude:</label>
      <br />
      <span id="longtitude" className={styles.user__details}>
        {data.long} ° E
      </span>
    </div>
  </div>
);

export default InfoDisplay;
