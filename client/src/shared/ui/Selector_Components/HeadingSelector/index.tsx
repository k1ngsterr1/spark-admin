"use client";
import React, { useState } from "react";

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

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
    setIsOpen(false);
  };
};
