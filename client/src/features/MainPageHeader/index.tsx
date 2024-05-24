import React from "react";
import { ButtonLink } from "@shared/ui/Buttons_Components/Buttons";

import Logo from "@assets/spark_product_logo.svg";
import styles from "./styles.module.scss";

export const MainPageHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className="flex  items-center gap-2">
          <div className={styles.header__logo}>
            <Logo />
          </div>
          <span className={styles.header__logo_text}>Spark Admin</span>
        </div>
        <nav className="flex items-center gap-2"></nav>
        <div className="flex items-center gap-2">
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
            href="login"
          />
        </div>
      </div>
    </header>
  );
};
