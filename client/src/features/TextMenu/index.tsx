"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontMenuSelector } from "@shared/ui/Selector_Components/FontMenuSelector";
import { useFetchFonts } from "@shared/lib/hooks/Fonts/useFetchFonts";

import styles from "./styles.module.scss";

export const TextMenu = () => {
  const googleFonts = useFetchFonts();

  return (
    <div className={`${styles.text_menu} dark:bg-dark-super `}>
      <div className={styles.text_menu__container}>
        <span className={styles.text_menu__container__text}>Text Settings</span>
        <FontAwesomeIcon
          icon={faClose}
          className={styles.text_menu__container__icon}
        />
      </div>
      <hr className={styles.text_menu__border} />
      <FontMenuSelector options={googleFonts} margin="mt-4" />
    </div>
  );
};
