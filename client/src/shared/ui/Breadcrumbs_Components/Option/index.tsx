import React from "react";

import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

interface OptionProps {
  name: string;
}

export const Option: React.FC<OptionProps> = ({ name }) => {
  return (
    <div className={styles.option}>
      <FontAwesomeIcon icon={faFile} className={styles.option__icon} /> {name}
    </div>
  );
};
