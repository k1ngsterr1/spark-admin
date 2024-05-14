"use client";
import React from "react";
import Logo from "@assets/spark_product_logo.svg";
import PopupGeneric from "@shared/ui/Generic_Components/PopupGeneric";
import InputProp from "@shared/ui/Inputs/DefaultInport";
import { usePageCardPopup } from "@shared/lib/contexts/AppContext";
import { Button } from "@shared/ui/Buttons_Components/Buttons";

import styles from "../WebsitePopup/styles.module.scss";
import { AttachmentFileInput } from "@shared/ui/Inputs/AttachmentInput";

// Попап для создания карточки страницы сайта
export const PageCardPopup = () => {
  const { isPageCardPopupVisible, togglePageCardPopup } = usePageCardPopup();

  if (!isPageCardPopupVisible) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleCheckSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <PopupGeneric onClose={togglePageCardPopup}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${styles.website_popup} dark:bg-dark-lighter`}
      >
        <div className={styles.website_popup__logo}>
          <Logo />
        </div>
        <span className={styles.website_popup__text}>
          Загрузите шаблон для страницы
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          <>
            <InputProp
              placeholder="Название шаблона"
              margin="mt-8"
              inputType="default"
              name="pageCardName"
            />
            <InputProp
              placeholder="Описание шаблона"
              margin="mt-8"
              inputType="default"
              name="pageCardDescription"
            />
            <AttachmentFileInput margin="mt-3" />
            <Button
              buttonType="regular--small"
              text="Создать шаблон"
              type="submit"
              margin="mt-4"
            />
          </>
        </form>
      </div>
    </PopupGeneric>
  );
};
