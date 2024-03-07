"use client";
import React, { useState, SyntheticEvent } from "react";
import { Button } from "@shared/ui/Buttons_Components/Buttons";
import Input from "../../shared/ui/Inputs/DefaultInport/index";
import { Selector } from "../../shared/ui/Selector";
import { useUserPopup } from "@shared/lib/contexts/AppContext";

import Logo from "../../assets/spark_product_logo.svg";

import styles from "./styles.module.scss";

interface PopUpProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopUp: React.FC<
  PopUpProps & {
    addUser: (user: { login: string; role: string; site: string }) => void;
  }
> = ({ setIsOpen, addUser }) => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [login, setLogin] = useState("");
  const [selectedSite, setSelectedSite] = useState<string>("");

  const handleConfirm = () => {
    addUser({ login: login, role: selectedRole, site: selectedSite });
    setIsOpen(false);
  };

  const { isUserPopupVisible, toggleUserPopup } = useUserPopup();

  const handlePopUpClick = (event: SyntheticEvent) => {
    event.stopPropagation();
  };

  if (!isUserPopupVisible) {
    return null;
  }

  return (
    <div className={styles.popup} onClick={toggleUserPopup}>
      <div className={styles.popup__items} onClick={handlePopUpClick}>
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
        <div className={styles.popup__items__container}>
          <Selector
            items={["Пользователь", "Редактор", "Админ"]}
            placeholder="Выберите роль"
            selectedValue={selectedRole}
            onChange={setSelectedRole}
          />
        </div>
        <div className={styles.popup__items__container}>
          <Selector
            items={["Site 1", "Site 2", "Site 3"]}
            placeholder="Выберите сайт"
            selectedValue={selectedSite}
            onChange={setSelectedSite}
          />
        </div>
        <Button
          onClick={handleConfirm}
          text="Внести изменения"
          buttonType="regular--small"
          margin="mt-6"
        />
      </div>
    </div>
  );
};

export default PopUp;
