import React from "react";
import { ButtonLink } from "@shared/ui/Buttons_Components/Buttons";

import Logo from "@assets/spark_product_logo.svg";
import styles from "./styles.module.scss";

export const MainPageHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className="flex items-center gap-2">
          <Logo />
          <span>Spark Admin</span>
        </div>
        <nav className="flex items-center gap-2"></nav>
        <div className="flex items-center gap-2">
          <ButtonLink
            text="Документация"
            buttonType="transparent--small"
            href="docs"
          />
          <ButtonLink text="Войти" buttonType="regular--small" href="login" />
        </div>
      </div>
    </header>
  );
};
