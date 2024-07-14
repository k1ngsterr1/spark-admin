"use client";
import React, { useState } from "react";
import Logo from "@assets/spark_product_logo.svg";
import PopupGeneric from "@shared/ui/Generic_Components/PopupGeneric";
import InputProp from "@shared/ui/Inputs/DefaultInport";
import { useUserPopup } from "@shared/lib/contexts/AppContext";
import { useGetWebsiteCode } from "@shared/lib/hooks/Websites/useGetWebsiteCode";
import { Button } from "@shared/ui/Buttons_Components/Buttons";
import { CodeInterface } from "@entities/CodeInterface";
import { StepIndicator } from "@entities/StepIndicator";
import { useCheckWebsiteVerification } from "@shared/lib/hooks/Websites/useCheckWebsiteVerification";

import styles from "./styles.module.scss";
import { useTranslations } from "next-intl";

// Попап для проверки верифицирован ли веб-сайт
export const CodePopup = () => {
  const { isWebVerifyPopupVisible, toggleWebVerifyPopup } = useUserPopup();
  const { checkVerificationWebsite, message } = useCheckWebsiteVerification();
  const { getWebsiteCode, url, setUrl, code } = useGetWebsiteCode();
  const [step, setStep] = useState<number>(1);
  const t = useTranslations("Popups");

  if (!isWebVerifyPopupVisible) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getWebsiteCode(event);
    setStep(2);
  };

  const handleCheckSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    checkVerificationWebsite(event, url);
    setStep(3);
  };

  return (
    <PopupGeneric onClose={toggleWebVerifyPopup}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.website_popup}
      >
        <div className={styles.website_popup__logo}>
          <Logo />
        </div>
        <StepIndicator currentStep={step} />
        <span className={styles.website_popup__text}>
          {/* Получите ваш код для верификации */}
          {t("code.text")}
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          {step === 1 && (
            <>
              <InputProp
                placeholder={t("code.url")}
                margin="mt-8"
                inputType="default"
                name="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button
                buttonType="regular--small"
                text={t("code.get_code")}
                type="submit"
                margin="mt-4"
              />
            </>
          )}
          {step === 2 && (
            <>
              <div className="flex w-[40%]">
                {!code ? (
                  <>{t("code.loading")}</>
                ) : (
                  <>
                    <CodeInterface code={code} />
                  </>
                )}
              </div>
              <Button
                onClick={(e: any) => handleCheckSubmit(e)}
                buttonType="regular--small"
                text={t("code.check_code")}
                margin="mt-4"
              />
            </>
          )}
          {step === 3 && (
            <div className="flex flex-col items-center">
              {!message ? <>{t("code.loading")}</> : <>{message}</>}
              <Button
                onClick={toggleWebVerifyPopup}
                buttonType="regular--small"
                text={t("code.close")}
                margin="mt-4"
              />
            </div>
          )}
        </form>
      </div>
    </PopupGeneric>
  );
};
