import { Menu } from "@features/Menu/index";
import { Users } from "@pages/usersPage/index";
import React from "react";

import styles from "./styles.module.scss";

export const UsersPage = () => {
  return (
    <div className={styles.user}>
      <Menu />
      <Users />
    </div>
  );
};

export default UsersPage;
