import React from "react";

import styles from "./styles.module.scss";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  margin: string;
  text: string;
  icon: IconDefinition;
}

export const NavButton: React.FC<NavButtonProps> = ({
  margin,
  icon,
  text,
  ...rest // Now rest includes all optional button HTML attributes
}) => {
  return (
    // Apply to pass all additional standard button attributes
    <button className={`${styles.nav_button} ${margin}`} {...rest}>
      <FontAwesomeIcon icon={icon} className={styles.nav_button__icon} />
      <span className={styles.nav_button__text}>{text}</span>
    </button>
  );
};
