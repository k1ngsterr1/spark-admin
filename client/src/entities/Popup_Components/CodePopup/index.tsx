"use client";
import React, { useState } from "react";
import Logo from "@assets/spark_product_logo.svg";
import PopupGeneric from "@shared/ui/Generic_Components/PopupGeneric";
import InputProp from "@shared/ui/Inputs/DefaultInport";
import { useUserPopup } from "@shared/lib/contexts/AppContext";
import { useGetWebsiteCode } from "@shared/lib/hooks/Websites/useGetWebsiteCode";
import { Button } from "@shared/ui/Buttons_Components/Buttons";
import { Step } from "@shared/ui/Step";
import { CodeInterface } from "@entities/CodeInterface";

import styles from "./styles.module.scss";
import { StepIndicator } from "@entities/StepIndicator";

// Окно верификации сайта и получения кода

export const CodePopup = () => {
  const { isWebVerifyPopupVisible, toggleWebVerifyPopup } = useUserPopup();
  const { getWebsiteCode, url, setUrl, code } = useGetWebsiteCode();
  const [step, setStep] = useState<number>(1);

  if (!isWebVerifyPopupVisible) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getWebsiteCode(event);
    setStep(2);
  };

  return (
    <PopupGeneric onClose={toggleWebVerifyPopup}>
      <>
        <div
          onClick={(e) => e.stopPropagation()}
          className={styles.website_popup}
        >
          <div className={styles.website_popup__logo}>
            <Logo />
          </div>
          <StepIndicator currentStep={step} />
          <span className={styles.website_popup__text}>
            Получите ваш код для верификации
          </span>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center"
          >
            {step === 1 ? (
              <InputProp
                placeholder="URL сайта"
                margin="mt-8"
                inputType="default"
                name="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            ) : (
              <div className="flex w-[40%]">
                <CodeInterface code={code} />
              </div>
            )}
            {step === 1 ? (
              <Button
                buttonType="regular--small"
                text="Получить код"
                type="submit"
                margin="mt-4"
              />
            ) : (
              <Button
                onClick={toggleWebVerifyPopup}
                buttonType="regular--small"
                text="Закрыть"
                margin="mt-4"
              />
            )}
          </form>
        </div>
      </>
    </PopupGeneric>
  );
};
