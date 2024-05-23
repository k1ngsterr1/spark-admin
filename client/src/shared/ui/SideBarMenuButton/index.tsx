import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import styles from "./styles.module.scss";

interface SideButtonProps {
  margin?: string;
  text: string;
  isOpen: boolean;
  onClick?: () => void;
  isActive: boolean;
  content?: React.ReactNode;  
}

export const SideBarButton: React.FC<SideButtonProps> = ({
  margin,
  text,
  isOpen,
  onClick,
  isActive
}) => {
  const [hover, setHover] = useState(false);

  return (
    <>
      <button
        className={`${styles.nav_button} ${margin || ''} ${isActive ? styles.active : ''}`}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span
          className={`${styles.nav_button__text} dark:text-white ${isOpen ? "flex" : "hidden"}`}
        >
          {text}
          {hover && !isActive && <FontAwesomeIcon icon={faChevronRight} className={styles.arrow} />}
        </span>
      </button>
    </>
  );
};
