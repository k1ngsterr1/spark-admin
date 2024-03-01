"use client";
import React from "react";
import { useWebPopup } from "@shared/lib/contexts/AppContext";

import Logo from "@assets/spark_product_logo.svg";

import styles from "./styles.module.scss";

interface ClientSide {
  popupState: any;
}

export const WebsitePopup = () => {
  const { isWebPopupVisible } = useWebPopup();

  if (!isWebPopupVisible) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.website_popup}>
        <Logo />
        <span className={styles.website_popup__text}>Добавьте ваш сайт</span>
      </div>
    </div>
  );
};
