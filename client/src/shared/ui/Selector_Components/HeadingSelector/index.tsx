"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

interface HeadingSelectorProps {
  options: any;
  margin: string;
  onSelect: (value: string) => void;
}

export const HeadingSelector: React.FC<HeadingSelectorProps> = ({
  options,
  margin,
  onSelect,
}) => {
  const [selectedValue, setSelectedValue] = useState(options[0]?.value || "");
  const [isOpen, setIsOpen] = useState(false);

  console.log("Options:", options);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.selector} ${margin}`}>
      <div
        className={styles.selector__selected}
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find((option) => option.value === selectedValue)?.label ||
          "Select a heading"}
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
      </div>
      {isOpen && (
        <ul className={styles.selector__dropdown}>
          {options.map((heading) => (
            <li
              key={heading.value}
              style={{
                fontSize: `${heading.size}`,
              }}
              className={styles.selector__tab}
              onClick={() => handleSelect(heading.value)}
            >
              <div className="flex flex-col items-center">
                <div className={styles.selector__tab__color} />
                <span className={styles.selector__tab__size}>
                  {heading.fontSize}
                </span>
              </div>
              {heading.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
