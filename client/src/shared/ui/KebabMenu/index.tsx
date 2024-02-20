import React from "react";

import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./styles.module.scss";

interface KebabMenuProps {}

export const KebabMenu: React.FC<KebabMenuProps> = () => {
  return (
    <>
      <FontAwesomeIcon
        icon={faEllipsisVertical}
        className={styles.kebab_menu}
        size="xl"
      />
    </>
  );
};
