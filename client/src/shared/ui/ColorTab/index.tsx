import React from "react";
import styles from "./styles.module.scss";

interface IColorTab {
  color: string;
}

export const ColorTab: React.FC<IColorTab> = ({ color }) => {
  return (
    <div
      className={styles.color_tab}
      style={{
        backgroundColor: color,
      }}
    />
  );
};
