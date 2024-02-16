import React from "react";

import styles from "./styles.module.scss";
import { UserTab } from "@entities/UserTab";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <UserTab name="Text" photo="aaa" />
      </div>
    </header>
  );
};
