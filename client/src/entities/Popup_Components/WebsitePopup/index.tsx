"use client";
import React, { SyntheticEvent } from "react";
import { useWebPopup } from "@shared/lib/contexts/AppContext";
import { useAddWebsite } from "@shared/lib/hooks/Websites/useAddWebsite";
import { Button } from "@shared/ui/Buttons_Components/Buttons";
import InputProp from "@shared/ui/Inputs/DefaultInport";

import Logo from "@assets/spark_product_logo.svg";

import styles from "../CodePopup/styles.module.scss";

export const WebsitePopup = () => {
  const { isWebPopupVisible, toggleWebPopup } = useWebPopup();
  const { addWebsite, url, setUrl, name, setName } = useAddWebsite();

  const handlePopupClick = (event: SyntheticEvent) => {
    event.stopPropagation();
  };

  if (!isWebPopupVisible) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={toggleWebPopup}>
      <div
        className={`${styles.website_popup} dark:bg-dark-lighter`}
        onClick={handlePopupClick}
      >
        <div className={styles.website_popup__logo}>
          <Logo />
        </div>
        <span className={styles.website_popup__text}>Добавьте веб-сайт</span>
        <form onSubmit={addWebsite} className="flex flex-col items-center">
          <InputProp
            placeholder="Имя сайта"
            margin="mt-8"
            inputType="default"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputProp
            placeholder="URL вашего сайта"
            margin="mt-8"
            inputType="default"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            buttonType="regular--small"
            text="Добавить сайт"
            type="submit"
            margin="mt-8"
          />
        </form>
      </div>
    </div>
  );
};
