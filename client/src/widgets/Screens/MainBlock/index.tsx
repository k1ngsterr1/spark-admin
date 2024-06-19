"use client";
import React from "react";
import { TypeHeading } from "@shared/ui/TypeHeading";
import { ButtonLink } from "@shared/ui/Buttons_Components/Buttons";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import styles from "../../../../app/[locale]/styles.module.scss";

export const MainBlock = () => {
  const t = useTranslations("MainPage");
  const { locale } = useParams();

  return (
    <div className={styles.container}>
      <div className="flex flex-col items-center justify-center mt-32">
        <span className={`${styles.container__mini_text} dark:text-gray-100`}>
          {t("miniText")}
        </span>
        <TypeHeading
          headingType=""
          speed={25}
          repeat={0}
          text={"Spark Admin"}
        />
        <p className={`${styles.container__paragraph} dark:text-gray-200`}>
          {t("paragraph")}
        </p>
        <div className="flex items-center justify-center gap-4 mt-12 ">
          <ButtonLink
            text={t("login")}
            margin="!cursor-none"
            buttonType="regular--bigger"
            href={`/${locale}/login`}
          />
        </div>
      </div>
    </div>
  );
};
