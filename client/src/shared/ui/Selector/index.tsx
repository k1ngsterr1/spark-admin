import React, { useState } from "react";

import styles from "./style.module.scss";

interface SelectorProps {
  items: string[];
  className?: string;
  onChange: (selectedOption: string) => void;
}

export const Selector: React.FC<SelectorProps> = ({
  items,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (selectedOption: string) => {
    onChange(selectedOption);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.selector} ${className || ""}`.trim()}>
      {items.map((item, index) => (
        <div
          className={styles.selector__items}
          key={index}
          onClick={() => handleOptionClick(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
