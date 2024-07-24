import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./styles.module.scss";

export const Loading = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.popup}>
        <ClipLoader color="#FF5722" />
      </div>
    </div>
  );
};
