import { Menu } from "@features/Menu/index";
import { Users } from "@widgets/Screens/usersPage/index";
import UserPopup from "@entities/Popup_Components/UserPopup";
import React from "react";

import styles from "./styles.module.scss";

export const UsersPage = () => {
  return (
    <div className={styles.user}>
      <Menu />
      <Users />
      <UserPopup />
    </div>
  );
};

export default UsersPage;
