import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

interface OptionProps {
  name: string;
}

export const Option: React.FC<OptionProps> = ({ name }) => {
  return (
    <div
      className={`${styles.option} dark:text-white dark:hover:bg-dark-upper2`}
    >
      <FontAwesomeIcon
        icon={faFile}
        className={`${styles.option__icon} dark:text-primary`}
      />{" "}
      <span className={`dark:text-white`}>{name}</span>
    </div>
  );
};
