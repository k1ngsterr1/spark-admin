import React from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./styles.module.scss";

interface AdditionalButtonsProps {
  icon: IconDefinition;
}

export const AdditionalButtons: React.FC<AdditionalButtonsProps> = ({
  icon,
}) => {
  return (
    <button className={styles.additional_button}>
      <FontAwesomeIcon icon={icon} className={styles.additional_button__icon} />
    </button>
  );
};
