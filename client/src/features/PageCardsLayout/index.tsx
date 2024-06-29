import React from "react";
import { useGetPageCard } from "@shared/lib/hooks/Websites/useGetPageCard";
import { PageCard } from "@entities/PageCard";
import { EmtpyScreen } from "@shared/ui/EmptyScreen";

import styles from "./styles.module.scss";

interface IPageCardsLayoutProps {
  pageType: string;
}

export const PageCardsLayout: React.FC<IPageCardsLayoutProps> = ({
  pageType,
}) => {
  const { data: items, loading } = useGetPageCard();

  console.log(items);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!items || items.length == 0) {
    return <EmtpyScreen text="There is no cards yet" />;
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
