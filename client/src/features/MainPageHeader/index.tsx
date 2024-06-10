import React from "react";
import { ButtonLink } from "@shared/ui/Buttons_Components/Buttons";
import { ThemeButton } from "@entities/DarkTheme";

import Logo from "@assets/spark_product_logo.svg";
import styles from "./styles.module.scss";

interface IMainPageHeader {
  locale: string | string[];
}

export const MainPageHeader: React.FC<IMainPageHeader> = ({ locale }) => {
  return (
    <header className={`${styles.header} dark:border-dark-lighter`}>
      <div className={styles.header__container}>
        <div className="flex  items-center gap-2">
          <div className={styles.header__logo}>
            <Logo />
          </div>
          <span className={styles.header__logo_text}>Spark Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeButton />
          <ButtonLink
            text="Документация"
            margin="!cursor-none"
            buttonType="transparent--small"
            href="docs"
          />
          <ButtonLink
            text="Войти"
            margin="!cursor-none"
            buttonType="regular--small"
            href={`/${locale}/login`}
          />
        </div>
      </div>
    </header>
  );
};
