import React from "react";
import { MainPageHeader } from "@features/MainPageHeader";
import { TypeHeading } from "@shared/ui/TypeHeading";
import Cursor from "@shared/ui/Cursor";

import styles from "./styles.module.scss";
import DynamicGrid from "@shared/ui/DynamicGrid";

const MainPage = () => {
  return (
    <>
      <Cursor />
      <MainPageHeader />
      <DynamicGrid />
      <div className={styles.container}>
        <div className="flex flex-col items-center justify-center mt-32">
          <span className={styles.container__mini_text}>
            Инновационное решение для ваших веб-сайтов
          </span>
          <TypeHeading
            headingType=""
            speed={25}
            repeat={0}
            text={"Spark Admin"}
          />
        </div>
      </div>
    </>
  );
};

export default MainPage;
