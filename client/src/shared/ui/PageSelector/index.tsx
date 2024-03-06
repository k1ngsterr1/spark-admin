import React from "react";

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
  return (
    <div className={styles.page_selector}>
      {pages.map((page, index) => (
        <span key={index}>Page Name</span>
      ))}
      <FontAwesomeIcon
        icon={faChevronDown}
        className={styles.page_selector__chevron}
      />
    </div>
  );
};
