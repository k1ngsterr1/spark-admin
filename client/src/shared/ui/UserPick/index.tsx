import React from "react";
import { KebabMenu } from "../KebabMenu";

import style from "./style.module.scss";

interface UserPickProps {
  login: string;
  role: string;
  site: string;
}

const UserPick: React.FC<UserPickProps> = ({ login, role, site }) => {
  return (
    <>
      <div className={style.userpick}>
        <p>{login}</p>
        <p>{role}</p>
        <p>{site}</p>
      </div>
    </>
  );
};

export default UserPick;
