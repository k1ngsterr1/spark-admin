import React from "react";
import { EmptySvg } from "@assets/index";

import styles from "./styles.module.scss";

interface IEmptyScreen {
  text: string;
}

export const EmtpyScreen: React.FC<IEmptyScreen> = ({ text }) => {
  return (
    <div className={styles.empty_screen}>
      <EmptySvg className={styles.empty_screen__image} />
      <p className={styles.empty_screen__text}>{text}</p>
    </div>
  );
};
