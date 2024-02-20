import { Button } from "@shared/ui/Buttons";
import { WebsiteTab } from "@entities/WebsiteTab";

import image from "@assets/example.png";

import styles from "./styles.module.scss";

export const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <div className="flex w-[90%] justify-between items-center m-auto ">
        <h1>Ваши Сайты</h1>
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
