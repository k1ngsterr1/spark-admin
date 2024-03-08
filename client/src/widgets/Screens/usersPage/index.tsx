"use client";
import React, { useState } from "react";
import { Button } from "@shared/ui/Buttons_Components/Buttons";
import UserPick from "@shared/ui/UserPick";

import styles from "./styles.module.scss";
import Heading from "@shared/ui/Heading";

export const Users = () => {
  const [users, setUsers] = useState<
    { login: string; role: string; site: string }[]
  >([]);

  return (
    <div className={styles.users}>
      <div className="flex w-[90%] justify-between items-center m-auto ">
        <Heading text="Управление пользователями" />
        <Button
          text="Добавить пользователя"
          buttonType="regular--small"
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
