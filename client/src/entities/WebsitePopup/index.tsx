"use client";
import React from "react";
import { useWebPopup } from "@shared/lib/contexts/AppContext";

import Logo from "@assets/spark_product_logo.svg";

import styles from "./styles.module.scss";
import InputProp from "@shared/ui/Inputs/DefaultInport";

interface ClientSide {
  popupState: any;
}

export const WebsitePopup = () => {
  const { isWebPopupVisible, toggleWebPopup } = useWebPopup();

  if (!isWebPopupVisible) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={toggleWebPopup}>
      <div className={styles.website_popup}>
        <div className={styles.website_popup__logo}>
          <Logo />
        </div>
        <span className={styles.website_popup__text}>Добавьте ваш сайт</span>
        <InputProp placeholder="URL вашего сайта" inputType="default" />
      </div>
    </div>
  );
};
