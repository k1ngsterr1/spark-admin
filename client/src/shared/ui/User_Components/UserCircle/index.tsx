import React from "react";
// import { faEarth } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

interface UserCircleProps {
  margin: string;
  name: string;
  id: string;
  value: string;
  surname: string;
}

export const UserCircle: React.FC<UserCircleProps> = ({
  margin,
  name,
  id,
  surname,
  value,
}) => {
  return (
    <div className={`${"flex items-center"} ${margin}`}>
      <div className={styles.container}>
        <p className={styles.container__text}>{name}</p>
      </div>
      <div className="flex flex-col ml-3">
        <p className={styles.container__surname}>{surname}</p>
        <p className={styles.container__id}>id: {id}</p>
        <p className={styles.container__id}>Кол-во сайтов: {value}</p>
      </div>
    </div>
  );
};
export default UserCircle;
