import React from "react";

import styles from "./styles.module.scss";

interface DropdownProps {
  items: any[];
  setOption: (selectedOption: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ items, setOption }) => {
  return (
    <div className={styles.selector__dropdown}>
      {items.map((item, index) => (
        <div
          className={styles.selector__items}
          key={index}
          onClick={() => setOption(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
