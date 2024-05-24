import React from "react";
import { MainPageHeader } from "@features/MainPageHeader";
import { TypeHeading } from "@shared/ui/TypeHeading";
import Cursor from "@shared/ui/Cursor";
import DynamicGrid from "@shared/ui/DynamicGrid";

import styles from "./styles.module.scss";
import { ButtonLink } from "@shared/ui/Buttons_Components/Buttons";

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
          <p className={styles.container__paragraph}>
            Наши инновационные подходы позволяют создавать уникальные и
            эффективные веб-сайты, адаптированные под ваши нужды. Мы используем
            передовые технологии, обеспечивая быстрый, безопасный и удобный
            пользовательский опыт. С нашими решениями ваш веб-сайт будет
            выделяться среди конкурентов и привлекать больше посетителей.
          </p>
          <div className="flex items-center justify-center gap-4 mt-12">
            <ButtonLink text="Войти" buttonType="regular" href="login" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
