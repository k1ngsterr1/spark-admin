"use client";
import React, { MouseEventHandler, ReactNode } from "react";

import styles from "./styles.module.scss";

interface PopupProps {
  children: ReactNode;
  onClose: MouseEventHandler<HTMLDivElement>;
}

const PopupGeneric: React.FC<PopupProps> = ({ children, onClose }) => {
  const handlePopupContentClick: MouseEventHandler<HTMLDivElement> = (e) =>
    e.stopPropagation();

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.popup} dark:bg-dark-lighter`} onClick={handlePopupContentClick}>
        {children}
      </div>
    </div>
  );
};

export default PopupGeneric;
