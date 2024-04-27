import React, { useState } from "react";
import Input from "@shared/ui/Inputs/DefaultInport";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "../Dropdown";
import useSelector from "@shared/lib/hooks/useSelector";

import styles from "./style.module.scss";

interface SelectorProps<T> {
  items: T[];
  className?: string;
  selectedValue: T;
  initialValue?: T;
  placeholder: string;
  onChange: (value: T) => void;
}

export const Selector = <T extends string | number>({
  items,
  onChange,
  selectedValue,
  className,
  placeholder,
  initialValue,
}: SelectorProps<T>): JSX.Element => {
  const { selectedItem, setSelectedItem } = useSelector<T>(initialValue!);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (selectedOption: any) => {
    setSelectedItem(selectedOption);
    onChange(selectedOption);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.selector} ${className || ""}`.trim()}>
      <div onClick={toggleDropdown} className={styles.inputWrapper}>
        <Input
          placeholder={placeholder}
          readOnly
          value={selectedValue}
          inputType="default"
        />
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className={styles.selector__icon}
        />
      </div>
      {isOpen && (
        <Dropdown
          items={items}
          className={`${styles.selector__dropdown} dark:bg-dark-lighter`}
          setOption={handleOptionClick}
        />
      )}
    </div>
  );
};
