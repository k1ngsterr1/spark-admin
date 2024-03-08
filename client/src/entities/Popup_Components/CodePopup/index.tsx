"use client";
import React, { useState } from "react";
import Logo from "@assets/spark_product_logo.svg";
import PopupGeneric from "@shared/ui/Generic_Components/PopupGeneric";
import { useUserPopup } from "@shared/lib/contexts/AppContext";

import styles from "./styles.module.scss";

export const CodePopup = () => {
  const { isWebPopupVisible, toggleWebPopup } = useUserPopup();

  if (!isWebPopupVisible) {
    return null;
  }

  return (
    <PopupGeneric onClose={toggleWebPopup}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.website_popup}
      >
        <div className={styles.website_popup__logo}>
          <Logo />
        </div>
        <span className={styles.website_popup__text}>
          Создайте уникальный код сайта
        </span>
      </div>
    </PopupGeneric>
  );
};
