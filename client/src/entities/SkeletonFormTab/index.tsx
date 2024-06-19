import React from "react";
import { useTheme } from "next-themes";

import styles from "./styles.module.scss";

export const SkeletonFormTab = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const themeClass = isDarkMode
    ? styles.skeletonDarkLoader
    : styles.skeletonLoader;

  return (
    <div className={`${styles.form_tab} dark:bg-dark-lighter`}>
      <span
        className={`${themeClass}`}
        style={{ width: "50%", height: "20px", marginBottom: "10px" }}
      ></span>
      <span
        className={themeClass}
        style={{ width: "100%", height: "20px", marginBottom: "10px" }}
      ></span>
      <span
        className={themeClass}
        style={{ width: "100%", height: "20px", marginBottom: "10px" }}
      ></span>
      <span
        className={themeClass}
        style={{ width: "100%", height: "20px", marginBottom: "10px" }}
      ></span>
      <span
        className={themeClass}
        style={{ width: "20%", height: "20px" }}
      ></span>
    </div>
  );
};
