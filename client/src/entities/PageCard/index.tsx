import React from "react";
import Image, { StaticImageData } from "next/image";

import styles from "./styles.module.scss";
import { ButtonLink } from "@shared/ui/Buttons_Components/Buttons";

interface IPageCard {
  name: string;
  url: string;
  description: string;
}

export const PageCard: React.FC<IPageCard> = ({ name, url, description }) => {
  return (
    <div
      className={`${styles.page_card} dark:bg-dark-lighter dark:hover:bg-dark-upper`}
    >
      <Image className={styles.page_card__image} src={url} alt={name} />
      <div className={styles.page_card__section}>
        <span
          className={`${styles.page_card__section__heading} dark:text-white`}
        >
          {name}
        </span>
        <p
          className={`${styles.page_card__section__paragraph} dark:text-white`}
        >
          {description}
        </p>
        <div className="w-full flex items-center pt-8  gap-2 pr-4">
          <ButtonLink text="Выбрать" href="a" buttonType="card-button" />
          <ButtonLink text="Посмотреть" href="a" buttonType="card-button" />
        </div>
      </div>
    </div>
  );
};
