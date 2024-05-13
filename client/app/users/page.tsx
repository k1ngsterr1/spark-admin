'use client'
import React from "react";
import { Menu } from "@features/Menu/index";
import { Users } from "@widgets/Screens/usersPage/index";
import { Header } from "@features/Header";
import UserPopup from "@entities/Popup_Components/UserPopup";
import { useGetUsers } from "@shared/lib/hooks/Websites/useGetUsers";

import styles from "./styles.module.scss";

export const UsersPage = () => {
  const { data, isLoading } = useGetUsers();

  return (
    <div className={styles.user}>
      <Menu />
      <main className="flex flex-col w-full">
        <Header />
        <Users users={data} isLoading={isLoading} />
        <UserPopup />
      </main>
    </div>
  );
};

export default UsersPage;
