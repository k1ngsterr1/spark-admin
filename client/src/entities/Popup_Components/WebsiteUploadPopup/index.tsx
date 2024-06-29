"use client";
import React, { SyntheticEvent, useState } from "react";
import { useWebsiteUploadPopup } from "@shared/lib/contexts/AppContext";
import { AttachmentFileInput } from "@shared/ui/Inputs/AttachmentInput";
import { Button } from "@shared/ui/Buttons_Components/Buttons";
import { useTranslations } from "next-intl";
import { useUploadWebsite } from "@shared/lib/hooks/Websites/useUploadWebsite";

import Logo from "@assets/spark_product_logo.svg";

import styles from "../CodePopup/styles.module.scss";

export const WebsiteUploadPopup = () => {
  const t = useTranslations("Popups");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { uploadWebsite } = useUploadWebsite();
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
        <span className={styles.website_popup__text}>{t("upload.upload")}</span>
        <form
          className="w-full flex flex-col items-center justify-center"
          onSubmit={(event) => uploadWebsite(event, selectedFile)}
        >
          <AttachmentFileInput
            margin="mt-4"
            onChange={(event) => setSelectedFile(event.target.files[0])}
            placeholder={t("upload.your_build")}
          />
          <Button
            text={t("upload.button")}
            buttonType="regular--small"
            margin="mt-8"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};
