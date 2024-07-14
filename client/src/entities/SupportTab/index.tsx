import React from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ISupportTab {
  name: string;
  description: string;
  icon: IconDefinition;
  href: string;
  additionalStyles: string;
}

export const SupportTab: React.FC<ISupportTab> = ({
  name,
  description,
  icon,
  href,
  additionalStyles,
}) => {
  return (
    <div className={`${styles.support_tab} ${additionalStyles}`}>
      <FontAwesomeIcon icon={icon} className={styles.support_tab__icon} />
      <div className="flex flex-col items-start">
        <span className={styles.support_tab__name}>{name}</span>
        <span className={styles.support_tab__description}>{description}</span>
      </div>
    </div>
  );
};
