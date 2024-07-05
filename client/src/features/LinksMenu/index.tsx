import React from "react";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export const LinksMenu = () => {
  return (
    <div className={`${styles.links_menu} dark:bg-dark`}>
      <div className={styles.links_menu__container}>
        <span className={styles.links_menu__container__text}>
          What do you want to link to?
        </span>
        <FontAwesomeIcon
          icon={faClose}
          className={styles.links_menu__container__icon}
        />
      </div>
    </div>
  );
};
