import React from "react";
import {
  faArrowRightToBracket,
  faChartArea,
  faGear,
  faGlobe,
  faHeadphones,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { MenuButton, NavButton } from "@shared/ui/NavButton";

import SparkLogo from "@assets/spark_product_logo.svg";

import styles from "./styles.module.scss";

export const Menu = () => {
  return (
    <aside className={styles.menu}>
      <div className={styles.menu__logo}>
        <SparkLogo />
      </div>
      <nav className={styles.menu__nav}>
        <NavButton
          icon={faGlobe}
          href="/websites"
          text="Мои сайты"
          margin="mt-0"
        />
        <NavButton icon={faUser} href="/users" text="Мои юзеры" margin="mt-4" />
        <NavButton
          icon={faChartArea}
          href="/analytics"
          text="Аналитика"
          margin="mt-4"
        />
        <NavButton
          icon={faLock}
          href="/analytics"
          text="Мой доступ"
          margin="mt-4"
        />
        <NavButton
          icon={faHeadphones}
          href="/support"
          text="Поддержка"
          margin="mt-4"
        />
        <NavButton
          icon={faGear}
          href="/settings"
          text="Настройки"
          margin="mt-4"
        />
      </nav>
      <MenuButton
        icon={faArrowRightToBracket}
        href="/websites"
        text="Выйти"
        margin="mb-8"
      />
    </aside>
  );
};
