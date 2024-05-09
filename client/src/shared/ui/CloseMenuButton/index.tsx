import React from "react";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./styles.module.scss";

interface ICloseMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const CloseMenuButton: React.FC<ICloseMenuButtonProps> = ({
  isOpen,
  onClick,
}) => {
  return (
    <button className={styles.close_button} onClick={onClick}>
      <FontAwesomeIcon icon={isOpen ? faChevronLeft : faChevronRight} />
    </button>
  );
};
