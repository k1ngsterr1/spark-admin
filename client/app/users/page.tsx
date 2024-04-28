import { Menu } from "@features/Menu/index";
import { Users } from "@widgets/Screens/usersPage/index";
import { Header } from "@features/Header";
import UserPopup from "@entities/Popup_Components/UserPopup";
import React from "react";

import styles from "./styles.module.scss";

export const UsersPage = () => {
  return (
    <div className={styles.user}>
      <Menu />
      <main className="flex flex-col w-full">
        <Header />
        <Users />
        <UserPopup />
      </main>
    </div>
  );
};

export default UsersPage;
