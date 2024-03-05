import { Menu } from "@features/Menu/index";
import { Users } from "@widgets/Screens/usersPage/index";
import PopUp from "@entities/PopUp/index";
import React from "react";

import styles from "./styles.module.scss";

export const UsersPage = () => {
  return (
    <div className={styles.user}>
      <Menu />
      <Users />
      <PopUp />
    </div>
  );
};

export default UsersPage;
