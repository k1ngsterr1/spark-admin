import React from "react";
import { MainPageHeader } from "@features/MainPageHeader";

import styles from "./styles.module.scss";

const MainPage = () => {
  return (
    <div className={styles}>
      <MainPageHeader />
    </div>
  );
};

export default MainPage;
