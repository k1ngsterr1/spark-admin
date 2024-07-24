import React from "react";
import styles from "./styles.module.scss";

interface IMenuSeparator {
  margin: string;
}

export const MenuSeparator: React.FC<IMenuSeparator> = ({ margin }) => {
  return <hr className={`${styles.menu_separator} ${margin}`} />;
};
