import React from "react";
import styles from "./styles.module.scss";

export const SkeletonFormTab: React.FC = () => {
  return (
    <div className={`${styles.form_tab} dark:bg-dark-lighter`}>
      <span
        className={styles.skeletonLoader}
        style={{ width: "50%", height: "20px", marginBottom: "10px" }}
      ></span>
      <span
        className={styles.skeletonLoader}
        style={{ width: "100%", height: "20px", marginBottom: "10px" }}
      ></span>
      <span
        className={styles.skeletonLoader}
        style={{ width: "100%", height: "20px", marginBottom: "10px" }}
      ></span>
      <span
        className={styles.skeletonLoader}
        style={{ width: "100%", height: "20px", marginBottom: "10px" }}
      ></span>
      <span
        className={styles.skeletonLoader}
        style={{ width: "20%", height: "20px" }}
      ></span>
    </div>
  );
};
