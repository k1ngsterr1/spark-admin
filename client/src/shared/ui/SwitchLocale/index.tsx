"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import styles from "./styles.module.scss";

export const SwitchLocale = ({ locale }) => {
  const t = useTranslations("MainPage");
  const router = useRouter(); // Corrected usage of useRouter for client-side navigation

  const switchLocale = () => {
    const newLocale = locale === "en" ? "ru" : "en";
    const newPath = `/${newLocale}${window.location.pathname.substring(3)}`; // Constructs new path by replacing the locale part

    router.push(newPath);
  };

  return (
    <button
      onClick={switchLocale}
      className={`${styles.locale_button} hoverable`}
    >
      {locale === "en" ? "RU" : "EN"}
    </button>
  );
};
