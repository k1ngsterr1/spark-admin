import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import styles from "./styles.module.scss";

interface SideButtonProps {
  margin?: string;
  text: string;
  onClick?: () => void;
  isActive: boolean;
}

export const SideBarButton: React.FC<SideButtonProps> = ({
  margin,
  text,
  onClick,
  isActive,
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
          className={`${styles.nav_button__text} dark:text-white`}
        >
          {text}
        </span>
        {hover && !isActive && <FontAwesomeIcon icon={faChevronRight} className={styles.arrow} />}
      </button>
    </>
  );
};
