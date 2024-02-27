import React from "react";

import Logo from "@assets/spark_product_logo.svg";

import styles from "./styles.module.scss";

interface WebsitePopupProps {
  isOpen: boolean;
}

export const WebsitePopup: React.FC<WebsitePopupProps> = ({ isOpen }) => {
  if (!isOpen) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.website_popup}>
        <Logo />
        <span className={styles.website_popup__text}>Добавьте ваш сайт</span>
      </div>
    </div>
  );
};
