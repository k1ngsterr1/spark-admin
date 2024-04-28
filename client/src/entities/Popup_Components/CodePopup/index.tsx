"use client";
import React from "react";
import Logo from "@assets/spark_product_logo.svg";
import PopupGeneric from "@shared/ui/Generic_Components/PopupGeneric";
import InputProp from "@shared/ui/Inputs/DefaultInport";
import { useUserPopup } from "@shared/lib/contexts/AppContext";
import { useGetWebsiteCode } from "@shared/lib/hooks/Websites/useGetWebsiteCode";

import styles from "./styles.module.scss";

export const CodePopup = () => {
  const { isWebVerifyPopupVisible, toggleWebVerifyPopup } = useUserPopup();
  const { getWebsiteCode, url, setUrl } = useGetWebsiteCode();

  if (!isWebVerifyPopupVisible) {
    return null;
  }

  return (
    <PopupGeneric onClose={toggleWebVerifyPopup}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.website_popup}
      >
        <div className={styles.website_popup__logo}>
          <Logo />
        </div>
        <span className={styles.website_popup__text}>
          Вставьте url ссылку и получите ваш код для верификации
        </span>
        <InputProp
          placeholder="Имя сайта"
          margin="mt-8"
          inputType="default"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
    </PopupGeneric>
  );
};
