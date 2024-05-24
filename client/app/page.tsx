import React from "react";
import { MainPageHeader } from "@features/MainPageHeader";

import styles from "./styles.module.scss";

const MainPage = () => {
  return (
    <>
      <MainPageHeader />
      <div className={styles.container}>
        <h1 className={styles.container__heading}>
          Добро пожаловать в <span className="text-primary">Spark Admin</span>
        </h1>
      </div>
    </>
  );
};

export default MainPage;
