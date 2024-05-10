import React from "react";
import image from "@assets/example.png";

import { PageCard } from "@entities/PageCard";

import styles from "./styles.module.scss";

interface IPageCardsLayoutProps {
  pageType: string;
}

export const PageCardsLayout: React.FC<IPageCardsLayoutProps> = ({
  pageType,
}) => {
  return (
    <div className={styles.page_cards_layout}>
      <PageCard
        name="Стандратный лэндинг"
        description="Это макет для стандартного лэндинга чтобы сделать его пиздец крутым"
        image={image}
      />
      <PageCard
        name="Стандратный лэндинг"
        description="Это макет для стандартного лэндинга чтобы сделать его пиздец крутым"
        image={image}
      />
      <PageCard
        name="Стандратный лэндинг"
        description="Это макет для стандартного лэндинга чтобы сделать его пиздец крутым"
        image={image}
      />
      <PageCard
        name="Стандратный лэндинг"
        description="Это макет для стандартного лэндинга чтобы сделать его пиздец крутым"
        image={image}
      />
      <PageCard
        name="Стандратный лэндинг"
        description="Это макет для стандартного лэндинга чтобы сделать его пиздец крутым"
        image={image}
      />
      <PageCard
        name="Стандратный лэндинг"
        description="Это макет для стандартного лэндинга чтобы сделать его пиздец крутым"
        image={image}
      />
    </div>
  );
};
