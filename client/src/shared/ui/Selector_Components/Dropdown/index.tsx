import React from "react";

import styles from "./styles.module.scss";

interface DropdownProps {
  items: any[];
  className: string;
  setOption: (selectedOption: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  setOption,
  className,
}) => {
  return (
    <div className={`${styles.dropdown} dark:bg-dark-upper`}>
      {items.map((item, index) => (
        <div
          className={`${styles.items} dark:bg-dark-upper`}
          key={index}
          onClick={() => setOption(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
