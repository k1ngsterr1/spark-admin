"use client";
import React, { useState } from "react";
import { SearchBar } from "@features/SearchBar";
import { Button } from "@shared/ui/Buttons";
import PopUp from "@shared/ui/PopUp";
import UserPick from "@shared/ui/UserPick";

import styles from "../styles/styles.module.scss";

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
        <h1>Управление пользователями</h1>
        <Button
          onClick={handleOpenPopUp}
          text="Добавить пользователя"
          buttonType="regular--small"
        />
        <PopUp
          isOpen={isPopUpOpen}
          setIsOpen={setIsPopUpOpen}
          addUser={addUser}
        />
      </div>
      <div className={styles.users__box}>
        <SearchBar />
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
