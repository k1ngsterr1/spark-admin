import React from "react";

import styles from "./styles.module.scss";

interface UserTabProps {
  name: string;
  photo: string;
}

export const UserTab: React.FC<UserTabProps> = ({ name, photo }) => {
  return (
    <div className={styles.user_tab}>
      <span className={styles.user_tab__name}>{name}</span>
      <img
        src={photo}
        alt={`${name}'s profile photo`}
        className={styles.user_tab__photo}
      />
    </div>
  );
};
