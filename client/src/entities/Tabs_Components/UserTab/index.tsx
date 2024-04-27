'use client'
import React from "react";
import { useTheme } from 'next-themes'

import styles from "./styles.module.scss";

interface UserTabProps {
  name: string;
  photo: string;
}

export const UserTab: React.FC<UserTabProps> = ({ name, photo }) => {
  const { theme } = useTheme()

  return (
    <div className={styles.user_tab}>
      <span className={styles.user_tab__name}>{name}</span>
      <img
        src={ theme === 'light' ? 'https://i.ibb.co.com/wS1Q77R/avatar.png' : 'https://i.ibb.co.com/KjvYd53/avatar-black.png'}
        alt={`${name}'s profile photo`}
        className={styles.user_tab__photo}
      />
    </div>
  );
};
