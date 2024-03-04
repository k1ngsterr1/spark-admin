import React, { useState } from "react";
import Input from "../../../shared/ui/Inputs/DefaultInport/index";

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
  const [isSelectorVisible, setIsSelectorVisible] = useState(false);
  const [isSiteSelectorVisible, setIsSiteSelectorVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [login, setLogin] = useState("");
  const [site, setSite] = useState("");
  const [selectedSite, setSelectedSite] = useState<string>("");

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
        </div>
      ))}
    </div>
  );
};
