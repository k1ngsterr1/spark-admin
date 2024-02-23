import React from "react";
import { Button } from "@shared/ui/Buttons";
import Heading from "@shared/ui/Heading/index";
import { WebsiteTab } from "@entities/WebsiteTab";

import image from "@assets/example.png";

import styles from "./styles.module.scss";

export const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <div className="flex w-[90%] justify-between items-center m-auto ">
        <Heading text="Ваши Сайты" />
        <Button text="Добавить сайт" buttonType="regular--small" />
      </div>
      <section className={styles.sites_section}>
        <WebsiteTab text="Проверка" preview={image} userQuantity={3} />
        <WebsiteTab text="Проверка" preview={image} userQuantity={3} />
        <WebsiteTab text="Проверка" preview={image} userQuantity={3} />
        <WebsiteTab text="Проверка" preview={image} userQuantity={3} />
        <WebsiteTab text="Проверка" preview={image} userQuantity={3} />
        <WebsiteTab text="Проверка" preview={image} userQuantity={3} />
        <WebsiteTab text="Проверка" preview={image} userQuantity={3} />
      </section>
    </div>
  );
};
