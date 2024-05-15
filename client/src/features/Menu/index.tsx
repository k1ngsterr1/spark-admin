"use client";
import React, { useState, useRef } from "react";
import { NavButton } from "@shared/ui/Buttons_Components/NavButton";
import { CloseMenuButton } from "@shared/ui/CloseMenuButton";
import { useSideMenu } from "@shared/lib/hooks/Animations/useSideMenuAnimations";
import { navlinks } from "@shared/lib/hooks/content/linksContent";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import SparkLogo from "@assets/spark_product_logo.svg";

import styles from "./styles.module.scss";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { menuRef, getTextRef } = useSideMenu(isOpen);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
        {navlinks.map((link, index) => (
          <NavButton
            key={index}
            icon={link.icon}
            href={link.href}
            text={link.text}
            margin={link.margin}
            textRef={getTextRef(index)}
            isOpen={isOpen}
          />
        ))}
      </nav>
      <NavButton
        icon={faArrowRightToBracket}
        href="/login"
        text="Выйти"
        margin="mb-8"
        textRef={getTextRef(navlinks.length)}
        isOpen={isOpen}
      />
    </aside>
  );
};
