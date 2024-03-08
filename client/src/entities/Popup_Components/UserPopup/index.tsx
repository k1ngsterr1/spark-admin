"use client";
import PopupGeneric from "@shared/ui/Generic_Components/PopupGeneric";
import React, { useState } from "react";
import { Button } from "@shared/ui/Buttons_Components/Buttons";
import Input from "@shared/ui/Inputs/DefaultInport/index";
import { Selector } from "@shared/ui/Selector_Components/Selector";
import { useUserPopup } from "@shared/lib/contexts/AppContext";

import Logo from "@assets/spark_product_logo.svg";

interface PopUpProps {
  addUser: (user: { login: string; role: string; site: string }) => void;
}

const UserPopup: React.FC<PopUpProps> = ({ addUser }) => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [selectedSite, setSelectedSite] = useState<string>("");

  const { isUserPopupVisible, toggleUserPopup } = useUserPopup();

  const handleConfirm = () => {
    addUser({ login, role: selectedRole, site: selectedSite });
    toggleUserPopup();
  };

  if (!isUserPopupVisible) {
    return null;
  }

  return (
    <PopupGeneric onClose={toggleUserPopup}>
      <div onClick={(e) => e.stopPropagation()}>
        <div>
          <Logo />
        </div>
        <p>Меню передачи ролей</p>
        <Input
          placeholder="Введите логин пользователя"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          inputType="default"
        />
        <div>
          <Selector
            items={["Пользователь", "Редактор", "Админ"]}
            placeholder="Выберите роль"
            selectedValue={selectedRole}
            onChange={setSelectedRole}
          />
        </div>
        <div>
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
    </PopupGeneric>
  );
};

export default UserPopup;
