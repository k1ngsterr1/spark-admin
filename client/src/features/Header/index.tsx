"use client";
import React from "react";
import { SearchBar } from "@features/SearchBar";
import { ThemeButton } from "@entities/DarkTheme";
import { SwitchLocale } from "@shared/ui/SwitchLocale";
import { useParams } from "next/navigation";

import styles from "./styles.module.scss";

export const Header = () => {
  const { locale } = useParams();

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <SearchBar />
        <ThemeButton />
        <SwitchLocale locale={locale} />
      </div>
    </header>
  );
};
