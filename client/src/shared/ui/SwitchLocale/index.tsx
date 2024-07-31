"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useChangeLanguage } from "@shared/lib/hooks/Misc/useChangeLanguage";

import styles from "./styles.module.scss";

interface ISwitchLocale {
  locale: string | string[];
}

export const SwitchLocale: React.FC<ISwitchLocale> = ({ locale }) => {
  const t = useTranslations("MainPage");
  const [initialMount, setInitialMount] = useState<boolean>(true);
  const [newPath, setNewPath] = useState("");
  const router = useRouter();
  const { changeLanguage, isSocketSent } = useChangeLanguage();
  const isInitialMount = useRef(true);

  const switchLocale = () => {
    try {
      const newLocale = locale === "en" ? "ru" : "en";
      const path = `/${newLocale}${window.location.pathname.substring(3)}`;
      setNewPath(path);
      changeLanguage(newLocale);
    } catch (error) {
      console.error("There was an error with language changing");
    }
  };

  useEffect(() => {
    if (isSocketSent) {
      router.push(newPath);
    }
  }, [isSocketSent]);

  return (
    <button
      onClick={switchLocale}
      className={`${styles.locale_button} hoverable`}
    >
      {locale === "en" ? "RU" : "EN"}
    </button>
  );
};
