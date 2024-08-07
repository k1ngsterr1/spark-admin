import React, { LegacyRef, useEffect } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import styles from "./styles.module.scss";
import { ReactTooltip } from "@shared/ui/Tooltip";
import { PlacesType } from "react-tooltip";

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  margin: string;
  text: string;
  icon: IconDefinition;
  href: string;
  isOpen: boolean;
  id: string;
  data_tooltip_content: string;
  data_tooltip_id: string;
  data_tooltip_place: any;
  textRef: LegacyRef<HTMLSpanElement>;
  onClick?: () => void;
}

export const NavButton: React.FC<NavButtonProps> = ({
  margin,
  icon,
  text,
  href,
  isOpen,
  id,
  textRef,
  data_tooltip_content,
  data_tooltip_id,
  data_tooltip_place,
  onClick,
}) => {
  return (
    <>
      <Link
        className={`${styles.nav_button} ${margin}`}
        href={href}
        data-tooltip-content={data_tooltip_content}
        data-tooltip-id={data_tooltip_id}
        data-tooltip-place={data_tooltip_place}
        onClick={onClick}
      >
        <FontAwesomeIcon
          icon={icon}
          className={styles.nav_button__icon}
          size="lg"
        />
        <span
          className={`${styles.nav_button__text} dark:text-white ${isOpen ? "flex" : "hidden"}`}
          ref={textRef}
        >
          {text}
        </span>
        {!isOpen && <ReactTooltip id={id} />}
      </Link>
    </>
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
      <span className={`${styles.nav_button__text} dark:text-white`}>
        {text}
      </span>
    </button>
  );
};
