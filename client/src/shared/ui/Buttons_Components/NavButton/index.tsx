import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import styles from "./styles.module.scss";

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
        size="lg"
      />
      <span className={`${styles.nav_button__text} dark:text-white`}>{text}</span>
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
        size="xl"
      />
      <span className={`${styles.nav_button__text} dark:text-white`}>{text}</span>
    </button>
  );
};
