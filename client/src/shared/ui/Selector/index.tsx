import React, { useState } from "react";
import Input from "../Inputs/DefaultInport/index";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./style.module.scss";

interface SelectorProps {
  items: string[];
  className?: string;
  selectedValue: string;
  placeholder: string;
  onChange: (selectedOption: string) => void;
}

export const Selector: React.FC<SelectorProps> = ({
  items,
  onChange,
  selectedValue,
  className,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (selectedOption: string) => {
    onChange(selectedOption);
    setIsOpen(false);
  };

  return (
    <div onClick={toggleDropdown} className={styles.selector}>
      <Input
        placeholder={placeholder}
        readOnly
        value={selectedValue}
        inputType="default"
      />
      <FontAwesomeIcon icon={faChevronDown} className={styles.selector__icon} />
      {isOpen && (
        <div className={styles.selector__dropdown}>
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
      )}
    </div>
  );
};
