"use client";
import React from "react";
import Logo from "@assets/spark_product_logo.svg";
import PopupGeneric from "@shared/ui/Generic_Components/PopupGeneric";
import InputProp from "@shared/ui/Inputs/DefaultInport";
import { useUserPopup } from "@shared/lib/contexts/AppContext";
import { useGetWebsiteCode } from "@shared/lib/hooks/Websites/useGetWebsiteCode";

import styles from "./styles.module.scss";
import { Button } from "@shared/ui/Buttons_Components/Buttons";

export const CodePopup = () => {
  const { isWebVerifyPopupVisible, toggleWebVerifyPopup } = useUserPopup();
  const { getWebsiteCode, url, setUrl, code } = useGetWebsiteCode();

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
          получите ваш код для верификации
        </span>
        <form
          onSubmit={getWebsiteCode}
          className="flex flex-col items-center justify-center"
        >
          <InputProp
            placeholder="URL сайта"
            margin="mt-8"
            inputType="default"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </form>
        <Button
          buttonType="regular--small"
          text="Get Code"
          type="submit"
          margin="mt-4"
        />
      </div>
    </PopupGeneric>
  );
};
