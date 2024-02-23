import React from "react";
import Image from "next/image";

import Logo from "@assets/spark_product_logo.svg";

import styles from "./styles.module.scss";

export const WebsitePopup = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.website_popup}>
        <Logo />
        <span className={styles.website_popup__text}>Добавьте ваш сайт</span>
      </div>
    </div>
  );
};
