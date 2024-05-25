"use client";
import React, { SyntheticEvent } from "react";
import { useWebsiteUploadPopup } from "@shared/lib/contexts/AppContext";

import Logo from "@assets/spark_product_logo.svg";

import styles from "../CodePopup/styles.module.scss";
import { AttachmentFileInput } from "@shared/ui/Inputs/AttachmentInput";
import { Button } from "@shared/ui/Buttons_Components/Buttons";

export const WebsiteUploadPopup = () => {
  const { isWebsiteUploadVisible, toggleWebsiteUploadPopup } =
    useWebsiteUploadPopup();

  const handlePopupClick = (event: SyntheticEvent) => {
    event.stopPropagation();
  };

  if (!isWebsiteUploadVisible) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={toggleWebsiteUploadPopup}>
      <div
        className={`${styles.website_popup} dark:bg-dark-lighter`}
        onClick={handlePopupClick}
      >
        <div className={styles.website_popup__logo}>
          <Logo />
        </div>
        <span className={styles.website_popup__text}>Залить веб-сайт</span>
        <AttachmentFileInput margin="mt-4" placeholder="Ваш билд" />
        <Button text="Залить" buttonType="regular--small" margin="mt-8" />
      </div>
    </div>
  );
};
