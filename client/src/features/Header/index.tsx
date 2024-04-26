import React from "react";

import styles from "./styles.module.scss";
import { UserTab } from "@entities/Tabs_Components/UserTab";
import { SearchBar } from "@features/SearchBar";
import { ThemeButton } from "@entities/DarkTheme";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <SearchBar />
        <UserTab name="Ruslan Makhmatov" photo="RM" />
        <ThemeButton />
      </div>
    </header>
  );
};
