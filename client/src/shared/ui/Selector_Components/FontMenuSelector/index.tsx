"use client";
import React, { useState } from "react";
import { useFetchFonts } from "@shared/lib/hooks/Fonts/useFetchFonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

interface StyleOption {
  label: string;
  value: string;
  fontSize?: number; // Make fontSize optional
}

interface StyleSelectorProps {
  options: StyleOption[];
  margin: string;
  onSelect: (value: string) => void;
}

export const FontMenuSelector: React.FC<StyleSelectorProps> = ({
  options,
  margin,
  onSelect,
}) => {
  const googleFonts = useFetchFonts();
  const [selectedValue, setSelectedValue] = useState(options[0]?.value || "");
  const [isOpen, setIsOpen] = useState(false);

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
          "Select a style"}
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
      </div>
      {isOpen && (
        <ul className={styles.selector__dropdown}>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={styles.selector__tab}
              style={{ fontSize: option.fontSize, fontFamily: option.value }}
            >
              {option.label}
            </li>
          ))}
          {googleFonts.map((font) => (
            <li
              key={font.value}
              className={styles.selector__tab}
              style={{
                fontFamily: `${font.label}`,
              }}
              onClick={() => handleSelect(font.value)}
            >
              {font.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
