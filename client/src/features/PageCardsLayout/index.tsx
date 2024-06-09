import React from "react";
import image from "@assets/example.png";

import { useGetPageCard } from '@shared/lib/hooks/Websites/useGetPageCard';
import { PageCard } from "@entities/PageCard";

import styles from "./styles.module.scss";

interface IPageCardsLayoutProps {
  pageType: string;
}

export const PageCardsLayout: React.FC<IPageCardsLayoutProps> = ({
  pageType,
}) => {
  const { data: items, loading } = useGetPageCard();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Добавляем проверку, чтобы убедиться, что items - это массив
  if (!Array.isArray(items)) {
    return <div>Error: Data is not an array</div>;
  }

  return (
    <div className={styles.page_cards_layout}>
      {items.map((item) => (
        <PageCard
          key={item.id}
          name={item.name}
          description={item.description}
          url={item.url}
        />
      ))}
    </div>
  );
};
