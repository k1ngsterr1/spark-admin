import React from "react";
import styles from "./styles.module.scss";

interface IPageTypeTab {
  name: string;
  type: string;
  onClick: () => void;
  isActive: boolean;
}

export const PageTypeTab: React.FC<IPageTypeTab> = ({
  name,
  onClick,
  isActive,
}) => {
  return (
    <div
      className={`${styles.page_type_tab} ${isActive ? "!bg-primary" : ""} dark:bg-dark-upper`}
      onClick={onClick}
    >
      <span
        className={`${styles.page_type_tab__text} ${isActive ? "text-white" : ""}`}
      >
        {name}
      </span>
    </div>
  );
};
