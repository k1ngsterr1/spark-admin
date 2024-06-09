import React from "react";
import { MainPageHeader } from "@features/MainPageHeader";
import { TypeHeading } from "@shared/ui/TypeHeading";
import { useTranslation } from "next-i18next";
import { ButtonLink } from "@shared/ui/Buttons_Components/Buttons";
import { AboutBlock } from "@widgets/Screens/About";
import Cursor from "@shared/ui/Cursor";
import DynamicGrid from "@shared/ui/DynamicGrid";

import { useTranslations } from "next-intl";

import styles from "./styles.module.scss";

const MainPage = () => {
  const t = useTranslations("MainPage");

  return (
    <>
      <Cursor />
      <MainPageHeader />
      <DynamicGrid />
      <div className={styles.container}>
        <div className="flex flex-col items-center justify-center mt-32">
          <span className={`${styles.container__mini_text} dark:text-gray-100`}>
            Инновационное решение для ваших веб-сайтов
            {/* {t('title')} */}
          </span>
          <TypeHeading
            headingType=""
            speed={25}
            repeat={0}
            text={"Spark Admin"}
          />
          <p className={`${styles.container__paragraph} dark:text-gray-200`}>
            Наши инновационные подходы позволяют создавать уникальные и
            эффективные веб-сайты, адаптированные под ваши нужды. Мы используем
            передовые технологии, обеспечивая быстрый, безопасный и удобный
            пользовательский опыт. С нашими решениями ваш веб-сайт будет
            выделяться среди конкурентов и привлекать больше посетителей.
          </p>
          <div className="flex items-center justify-center gap-4 mt-12 ">
            <ButtonLink
              text="Войти"
              margin="!cursor-none"
              buttonType="regular--bigger"
              href="login"
            />
          </div>
        </div>
      </div>
      <AboutBlock />
    </>
  );
};

export default MainPage;
