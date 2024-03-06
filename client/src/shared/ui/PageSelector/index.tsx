"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

interface PageItem {
  type: string;
  url: string;
}

interface PageSelectorProps {
  pages: PageItem[];
}

export const PageSelector: React.FC<PageSelectorProps> = ({ pages }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.page_selector} onClick={handleClick}>
      {pages.map((page, index) => (
        <span key={index}>Page Name</span>
      ))}
      <FontAwesomeIcon
        icon={faChevronDown}
        className={styles.page_selector__chevron}
      />
      {isOpen && (
        <div className={styles.page_selector__options}>
          <span className={styles.page_selector__options__option}>Главная</span>
          <span className={styles.page_selector__options__option}>Главная</span>
          <span className={styles.page_selector__options__option}>Главная</span>
        </div>
      )}
    </div>
  );
};
