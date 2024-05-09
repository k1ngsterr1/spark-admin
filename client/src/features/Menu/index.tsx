"use client";
import React, { useState, useRef } from "react";
import {
  faArrowRightToBracket,
  faChartArea,
  faGear,
  faGlobe,
  faHeadphones,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NavButton } from "@shared/ui/Buttons_Components/NavButton";
import { CloseMenuButton } from "@shared/ui/CloseMenuButton";
import { useSideMenu } from "@shared/lib/hooks/Animations/useSideMenuAnimations";

import SparkLogo from "@assets/spark_product_logo.svg";

import styles from "./styles.module.scss";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { menuRef } = useSideMenu(isOpen);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <aside
      className={`${styles.menu} dark:bg-dark-super relative`}
      ref={menuRef}
    >
      <CloseMenuButton onClick={toggleMenu} isOpen />
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
      <NavButton
        icon={faArrowRightToBracket}
        href="/login"
        text="Выйти"
        margin="mb-8"
      />
    </aside>
  );
};
