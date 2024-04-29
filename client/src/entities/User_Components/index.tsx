import React from "react";
import UserCircle from "@shared/ui/User_Components/UserCircle";

import styles from "./styles.module.scss";

export const UserTab = () => {
  return (
    <div className={`flex  ${styles.container}`}>
      <div className="flex-col">
        <UserCircle
          name="AA"
          id="1324345"
          surname="Artyom Andreev"
          margin=""
          value="29"
        />
      </div>
    </div>
  );
};
export default UserTab;
