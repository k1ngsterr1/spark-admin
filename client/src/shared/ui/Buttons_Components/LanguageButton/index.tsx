"use client";
import React, { useState } from "react";
import { i18n } from "next-i18next";

export const LanguageButton = () => {
  const switchLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === "ru" ? "en" : "ru";
    i18n.changeLanguage(newLang);
  };

  return (
    <button onClick={switchLanguage}>
      {i18n.language === "ru" ? "EN" : "RU"}
    </button>
  );
};
