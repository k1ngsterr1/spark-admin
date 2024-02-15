import React from "react";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

import SparkLogo from "@assets/spark_product_logo.svg";

import styles from "./styles.module.scss";
import { NavButton } from "@shared/ui/NavButton";

export const Menu = () => {
  return (
    <aside className={styles.menu}>
      <div className={styles.menu__logo}>
        <SparkLogo />
      </div>
      <nav className={styles.menu__nav}>
        <NavButton icon={faGlobe} text="Мои сайты" margin="mt-0" />
      </nav>
    </aside>
  );
};
