import React from "react";
import { SiteValue } from "../SiteValue";
import { faEarth } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

interface UserCircleProps {
  margin: string;
  name: string;
  id: string;
  surname: string;
}

export const UserCircle: React.FC<UserCircleProps> = ({
  margin,
  name,
  id,
  surname,
}) => {
  return (
    <div className={`${"flex items-center"} ${margin}`}>
      <div className={styles.container}>
        <p className={styles.container__text}>{name}</p>
      </div>
      <div className="flex flex-col ml-3">
        <p className={styles.container__surname}>{surname}</p>
        <p className={styles.container__id}>id: {id}</p>
        <SiteValue icon={faEarth} value="29" margin="" />
      </div>
    </div>
  );
};
export default UserCircle;
