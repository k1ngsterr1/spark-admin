import React from "react";

import styles from "./styles.module.scss";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  margin: string;
  text: string;
  icon: IconDefinition;
  href: string;
}

export const NavButton: React.FC<NavButtonProps> = ({
  margin,
  icon,
  text,
  href,
}) => {
  return (
    <Link className={`${styles.nav_button} ${margin}`} href={href}>
      <FontAwesomeIcon
        icon={icon}
        className={styles.nav_button__icon}
        size="2xl"
      />
      <span className={styles.nav_button__text}>{text}</span>
    </Link>
  );
};

export const MenuButton: React.FC<NavButtonProps> = ({
  margin,
  icon,
  text,
  href,
  ...rest
}) => {
  return (
    <button className={`${styles.nav_button} ${margin}`} {...rest}>
      <FontAwesomeIcon
        icon={icon}
        className={styles.nav_button__icon}
        size="2xl"
      />
      <span className={styles.nav_button__text}>{text}</span>
    </button>
  );
};
