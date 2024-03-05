"use client";
import React, { SyntheticEvent } from "react";
import { useWebPopup } from "@shared/lib/contexts/AppContext";
import { Button } from "@shared/ui/Buttons";
import InputProp from "@shared/ui/Inputs/DefaultInport";

import Logo from "@assets/spark_product_logo.svg";

import styles from "./styles.module.scss";

export const WebsitePopup = () => {
  const { isWebPopupVisible, toggleWebPopup } = useWebPopup();

  const handlePopupClick = (event: SyntheticEvent) => {
    event.stopPropagation();
  };

  if (!isWebPopupVisible) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={toggleWebPopup}>
      <div className={styles.website_popup} onClick={handlePopupClick}>
        <div className={styles.website_popup__logo}>
          <Logo />
        </div>
        <span className={styles.website_popup__text}>Добавьте ваш сайт</span>
        <InputProp placeholder="Имя сайта" margin="mt-8" inputType="default" />
        <InputProp
          placeholder="URL вашего сайта"
          margin="mt-8"
          inputType="default"
        />
        <Button
          buttonType="regular--small"
          text="Добавить сайт"
          margin="mt-8"
        />
      </div>
    </div>
  );
};
