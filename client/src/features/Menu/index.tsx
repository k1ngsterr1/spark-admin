"use client";
import React, { useState, useRef } from "react";
import { NavButton } from "@shared/ui/Buttons_Components/NavButton";
import { CloseMenuButton } from "@shared/ui/CloseMenuButton";
import { useSideMenu } from "@shared/lib/hooks/animations/useSideMenuAnimations";
import { navlinks } from "@shared/lib/hooks/content/linksContent";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import SparkLogo from "@assets/spark_product_logo.svg";

import styles from "./styles.module.scss";
import { useParams } from "next/navigation";

export const Menu = () => {
  const t = useTranslations("Menu");
  const { locale } = useParams();
  const [isOpen, setIsOpen] = useState(true);
  const { menuRef, getTextRef, logoRef } = useSideMenu(isOpen);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside
      className={`${styles.menu} dark:bg-dark-super relative`}
      ref={menuRef}
    >
      <CloseMenuButton onClick={toggleMenu} isOpen />
      <div className={styles.menu__logo} ref={logoRef}>
        <SparkLogo />
      </div>
      <nav className={styles.menu__nav}>
        {navlinks.map((link, index) => (
          <NavButton
            key={index}
            icon={link.icon}
            href={`/${locale}${link.href}`}
            text={t(link.textKey)}
            margin={link.margin}
            textRef={getTextRef(index)}
            isOpen={isOpen}
          />
        ))}
      </nav>
      <NavButton
        icon={faArrowRightToBracket}
        href="/login"
        text={t("logout")}
        margin="mb-8"
        textRef={getTextRef(navlinks.length)}
        isOpen={isOpen}
      />
    </aside>
  );
};
