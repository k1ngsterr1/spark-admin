import React, { useState } from "react";
<<<<<<< HEAD
import Input from "../Inputs/DefaultInport/index";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
=======
import Input from "../../../shared/ui/Inputs/DefaultInport/index";
>>>>>>> f6858981c7870ccdaf87656a188b3f61b74ec5c5

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
  const [isSelectorVisible, setIsSelectorVisible] = useState(false);
  const [isSiteSelectorVisible, setIsSiteSelectorVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [login, setLogin] = useState("");
  const [site, setSite] = useState("");
  const [selectedSite, setSelectedSite] = useState<string>("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (selectedOption: string) => {
    onChange(selectedOption);
    setIsOpen(false);
  };

  const handleRoleInputClick = () => {
    setIsSelectorVisible(!isSelectorVisible);
    if (isSelectorVisible) setIsSiteSelectorVisible(false);
  };

  const handleSiteInputClick = () => {
    setIsSiteSelectorVisible(!isSiteSelectorVisible);
    if (isSiteSelectorVisible) setIsSelectorVisible(false);
  };

  const handleRoleChange = (selectedRole) => {
    setSelectedRole(selectedRole);
    setIsSelectorVisible(false);
  };

  const handleSiteChange = (selectedSite) => {
    setSelectedSite(selectedSite);
    setIsSiteSelectorVisible(false);
  };

  return (
<<<<<<< HEAD
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
=======
    <div className={`${styles.selector} ${className || ""}`.trim()}>
      <Input
              placeholder="Выберите сайт"
              readOnly
              onClick={handleSiteInputClick}
              value={selectedSite}
              onChange={(e) => setSite(e.target.value)}
              inputType="default"
            />
      {items.map((item, index) => (
        <div
          className={styles.selector__items}
          key={index}
          onClick={() => handleOptionClick(item)}
        >
          {item}
>>>>>>> f6858981c7870ccdaf87656a188b3f61b74ec5c5
        </div>
      )}
    </div>
  );
};
