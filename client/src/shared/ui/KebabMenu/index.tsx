"use client";
import React, { useState } from "react";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.scss";

interface IKebabMenu {
  buttons: React.ReactNode[] | React.ReactNode;
}

export const KebabMenu: React.FC<IKebabMenu> = ({ buttons }) => {
  const [isKebabOpen, setKebabOpen] = useState(false);

  const handleOpenMenu = () => {
    setKebabOpen(!isKebabOpen);
  };

  return (
    <>
      <button className={styles.button_kebab} onClick={handleOpenMenu}>
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          className={styles.kebab_menu}
          size="xl"
        />
        {isKebabOpen && (
          <div className={`${styles.kebab_opened} dark:bg-dark-upper2`}>
            {buttons}
          </div>
        )}
      </button>
    </>
  );
};
