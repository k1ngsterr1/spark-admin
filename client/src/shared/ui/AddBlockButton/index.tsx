import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./styles.module.scss";

export const AddBlockButton = () => {
  return (
    <button className={styles.add_block_button}>
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
};
