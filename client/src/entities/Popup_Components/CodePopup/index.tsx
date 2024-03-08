"use client";
import React from "react";
import Logo from "@assets/spark_product_logo.svg";
import styles from "./styles.module.scss";

export const CodePopup = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.website_popup}>
        <div className={styles.website_popup__logo}>
          <Logo />
        </div>
        <span className={styles.website_popup__text}>Добавьте ваш сайт</span>
      </div>
    </div>
  );
};
