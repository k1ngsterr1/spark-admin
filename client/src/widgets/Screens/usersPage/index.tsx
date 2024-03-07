"use client";
import React, { useState } from "react";
import { SearchBar } from "@features/SearchBar";
<<<<<<< HEAD
import { Button } from "@shared/ui/Buttons";
=======
import { Button } from "@shared/ui/Buttons_Components/Buttons";
import PopUp from "@entities/PopUp";
>>>>>>> 7a33874621262f0282af2d7a53ccb9b8cbcae1df
import UserPick from "@shared/ui/UserPick";
import styles from "./styles.module.scss";

export const Users = () => {
  const [users, setUsers] = useState<
    { login: string; role: string; site: string }[]
  >([]);

  const addUser = (user: { login: string; role: string; site: string }) => {
    setUsers((currentUsers) => [...currentUsers, user]);
  };

  return (
    <div className={styles.users}>
      <div className="flex justify-between items-center mt-4">
        <h1 className={styles.users__main}>Управление пользователями</h1>
        <Button
          text="Добавить пользователя"
          buttonType="regular--small"
          margin={"mt-24"}
          functionType="userPopup"
        />
      </div>
      <div className={styles.users__box}>
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
