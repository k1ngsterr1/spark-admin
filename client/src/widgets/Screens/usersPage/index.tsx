"use client";
import React, { useState } from "react";
import { SearchBar } from "@features/SearchBar";
import { Button } from "@shared/ui/Buttons_Components/Buttons";
import PopUp from "@entities/PopUp";
import UserPick from "@shared/ui/UserPick";
import styles from "./styles.module.scss";

export const Users = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [users, setUsers] = useState<
    { login: string; role: string; site: string }[]
  >([]);

  const addUser = (user: { login: string; role: string; site: string }) => {
    setUsers((currentUsers) => [...currentUsers, user]);
  };

  const handleOpenPopUp = () => {
    setIsPopUpOpen(true);
  };
  return (
    <div className={styles.users}>
      <div className="flex justify-between items-center mt-4">
        <h1 className={styles.users__main}>Управление пользователями</h1>
        <Button
          onClick={handleOpenPopUp}
          text="Добавить пользователя"
          buttonType="regular--small"
          margin={"mt-24"}
        />
        <PopUp
          isOpen={isPopUpOpen}
          setIsOpen={setIsPopUpOpen}
          addUser={addUser}
        />
      </div>
      <div className={styles.users__box}>
        <SearchBar />
        <div className={styles.users__box__items}>
          <p>Логин пользователя</p>
          <p>Роль пользователя</p>
          <p>Сайт</p>
        </div>
        {users.map((user, index) => (
          <UserPick
            key={index}
            login={user.login}
            role={user.role}
            site={user.site}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
