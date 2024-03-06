import React, { useState, useRef } from "react";
import { Button } from "@shared/ui/Buttons";
import Input from "../../shared/ui/Inputs/DefaultInport/index";
import { Selector } from "../../shared/ui/Selector";
import { useOutsideClick } from "@shared/lib/hooks/useOutsideClick";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./styles.module.scss";
import Logo from "../../assets/spark_product_logo.svg";

interface PopUpProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopUp: React.FC<
  PopUpProps & {
    addUser: (user: { login: string; role: string; site: string }) => void;
  }
> = ({ isOpen, setIsOpen, addUser }) => {
  const [isSelectorVisible, setIsSelectorVisible] = useState(false);
  const [isSiteSelectorVisible, setIsSiteSelectorVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [login, setLogin] = useState("");
  const [site, setSite] = useState("");
  const [selectedSite, setSelectedSite] = useState<string>("");

  const popUpRef = useRef(null);
  const roleSelectorRef = useRef(null);
  const siteSelectorRef = useRef(null);

  useOutsideClick(roleSelectorRef, () => setIsSelectorVisible(false));
  useOutsideClick(siteSelectorRef, () => setIsSiteSelectorVisible(false));
  useOutsideClick(popUpRef, () => setIsOpen(false));
  const handleConfirm = () => {
    addUser({ login: login, role: selectedRole, site: selectedSite });
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
    <div
      ref={popUpRef}
      className={`${styles.popup} ${isOpen ? styles.show : ""}`}
    >
      {isOpen && (
        <div className={styles.popup__items}>
          <div className={styles.popup__items__logo}>
            <Logo />
          </div>
          <p className={styles.popup__items__text}>Меню передачи ролей</p>
          <Input
            placeholder="Введите логин пользователя"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            inputType="default"
          />
          <div ref={roleSelectorRef} className={styles.popup__items__container}>
            <Input
              placeholder="Выберите роль"
              readOnly
              onClick={handleRoleInputClick}
              value={selectedRole}
              inputType="default"
            />
            <FontAwesomeIcon
              icon={faChevronDown}
              className={styles.popup__items__icon}
              color={"gray"}
            />
            {isSelectorVisible && (
              <Selector
                items={["Пользователь", "Редактор", "Админ"]}
                onChange={(selectedRole) => {
                  handleRoleChange(selectedRole);
                  setIsSelectorVisible(false);
                }}
              />
            )}
          </div>
          <div ref={siteSelectorRef} className={styles.popup__items__container}>
            <Input
              placeholder="Выберите сайт"
              readOnly
              onClick={handleSiteInputClick}
              value={selectedSite}
              onChange={(e) => setSite(e.target.value)}
              inputType="default"
            />
            <FontAwesomeIcon
              icon={faChevronDown}
              className={styles.popup__items__icon}
              color={"gray"}
            />
            {isSiteSelectorVisible && (
              <Selector
                items={["Site 1", "Site 2", "Site 3"]}
                onChange={(selectedSite) => {
                  handleSiteChange(selectedSite);
                  setIsSiteSelectorVisible(false);
                }}
              />
            )}
          </div>
          <Button
            onClick={handleConfirm}
            text="Внести изменения"
            buttonType="regular--small"
            margin="mt-6"
          />
        </div>
      )}
    </div>
  );
};

export default PopUp;
