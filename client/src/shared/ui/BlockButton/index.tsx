import React from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./styles.module.scss";

interface IBlockButtonProps {
  icon: IconDefinition;
  onClick: () => void;
}

export const BlockButton: React.FC<IBlockButtonProps> = ({ icon, onClick }) => {
  return (
    <button className={styles.block_button} onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};
