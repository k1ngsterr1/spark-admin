import React from "react";

import styles from "./styles.module.scss";
import { UserTab } from "@entities/UserTab";
import { SearchBar } from "@features/SearchBar";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <SearchBar />
        <UserTab name="Text" photo="aaa" />
      </div>
    </header>
  );
};
