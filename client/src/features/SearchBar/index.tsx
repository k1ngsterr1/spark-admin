"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";
import { useTranslations } from "next-intl";

export const SearchBar = () => {
  const t = useTranslations("Search");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className={styles.search_tab}>
      <button className={styles.search_tab__button}>
        <FontAwesomeIcon
          className={styles.search_tab__icon}
          icon={faSearch}
          onClick={() => setIsExpanded(!isExpanded)}
          size="lg"
        />
      </button>
      {isExpanded && (
        <input
          type="text"
          className={`${styles.search_tab__input}`}
          value={searchTerm}
          placeholder={t("search")}
          onChange={(e) => setSearchTerm(e.target.value)}
          //   onBlur={() => setIsExpanded(false)}
          //   onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
      )}
    </div>
  );
};
